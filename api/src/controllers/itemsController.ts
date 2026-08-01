import type { Request, Response } from "express";
import type { ParamsDictionary } from "express-serve-static-core";

import { isMissingReferenceError } from "../database";
import * as itemsService from "../services/itemsService";
import type { ItemPayload } from "../types";

interface IdParams {
  id: string;
}

interface ItemRequestBody {
  categoryId?: string;
  locationId?: string;
  name?: string;
  description?: string;
  createdAt?: string;
}

const getItemPayload = (
  body: ItemRequestBody,
  image: string | null,
): ItemPayload | null => {
  if (
    !body.categoryId?.trim() ||
    !body.locationId?.trim() ||
    !body.name?.trim() ||
    !body.description?.trim() ||
    !body.createdAt?.trim() ||
    Number.isNaN(Date.parse(body.createdAt))
  ) {
    return null;
  }

  return {
    categoryId: body.categoryId,
    locationId: body.locationId,
    name: body.name,
    description: body.description,
    createdAt: body.createdAt,
    image,
  };
};

const getId = (value: string | string[] | undefined): string | null => {
  return typeof value === "string" && value.trim() ? value : null;
};

export const getAllItems = async (_request: Request, response: Response): Promise<void> => {
  try {
    response.json(await itemsService.getAll());
  } catch {
    response.status(500).json({ message: "Failed to fetch items." });
  }
};

export const getItemById = async (request: Request<IdParams>, response: Response): Promise<void> => {
  try {
    const item = await itemsService.getById(request.params.id);
    if (!item) {
      response.status(404).json({ message: "Item not found." });
      return;
    }
    response.json(item);
  } catch {
    response.status(500).json({ message: "Failed to fetch item." });
  }
};

export const createItem = async (
  request: Request<ParamsDictionary, unknown, ItemRequestBody>,
  response: Response,
): Promise<void> => {
  const image = request.file ? `uploads/${request.file.filename}` : null;
  const payload = getItemPayload(request.body, image);
  if (!payload) {
    await itemsService.discardImage(image);
    response.status(400).json({ message: "All item fields are required." });
    return;
  }
  try {
    response.status(201).json(await itemsService.create(payload));
  } catch (error: unknown) {
    await itemsService.discardImage(image);
    if (isMissingReferenceError(error)) {
      response.status(400).json({ message: "Selected category or location does not exist." });
      return;
    }
    response.status(500).json({ message: "Failed to create item." });
  }
};

export const updateItem = async (
  request: Request<ParamsDictionary, unknown, ItemRequestBody>,
  response: Response,
): Promise<void> => {
  try {
    const id = getId(request.params.id);
    if (!id) {
      response.status(400).json({ message: "Invalid item identifier." });
      return;
    }
    const existingItem = await itemsService.getById(id);
    if (!existingItem) {
      if (request.file) {
        await itemsService.discardImage(`uploads/${request.file.filename}`);
      }
      response.status(404).json({ message: "Item not found." });
      return;
    }

    const nextImage = request.file ? `uploads/${request.file.filename}` : existingItem.image;
    const payload = getItemPayload(request.body, nextImage);
    if (!payload) {
      if (request.file) {
        await itemsService.discardImage(nextImage);
      }
      response.status(400).json({ message: "All item fields are required." });
      return;
    }

    const item = await itemsService.update(id, payload);
    response.json(item);
  } catch (error: unknown) {
    if (request.file) {
      await itemsService.discardImage(`uploads/${request.file.filename}`);
    }
    if (isMissingReferenceError(error)) {
      response.status(400).json({ message: "Selected category or location does not exist." });
      return;
    }
    response.status(500).json({ message: "Failed to update item." });
  }
};

export const deleteItem = async (request: Request<IdParams>, response: Response): Promise<void> => {
  try {
    const deleted = await itemsService.remove(request.params.id);
    if (!deleted) {
      response.status(404).json({ message: "Item not found." });
      return;
    }
    response.sendStatus(204);
  } catch {
    response.status(500).json({ message: "Failed to delete item." });
  }
};
