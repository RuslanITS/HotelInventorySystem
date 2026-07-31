import { Request, Response } from "express";

import * as itemsService from "../services/itemsService";
import { ItemApi } from "../type";

interface IdParams {
  id: string;
}

export const getAllItems = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const items = await itemsService.getAll();

    res.status(200).json(items);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch items.",
    });
  }
};

export const getItemById = async (
  req: Request<IdParams>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const item = await itemsService.getById(id);

    if (!item) {
      res.status(404).json({
        message: "Item not found.",
      });

      return;
    }

    res.status(200).json(item);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch item.",
    });
  }
};

export const createItem = async (
  req: Request<{}, {}, ItemApi>,
  res: Response,
): Promise<void> => {
  try {
    const item = await itemsService.create(req.body);

    res.status(201).json(item);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create item.",
    });
  }
};

export const updateItem = async (
  req: Request<IdParams, {}, ItemApi>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const item = await itemsService.update(id, req.body);

    if (!item) {
      res.status(404).json({
        message: "Item not found.",
      });

      return;
    }

    res.status(200).json(item);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update item.",
    });
  }
};

export const deleteItem = async (
  req: Request<IdParams>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const deleted = await itemsService.remove(id);

    if (!deleted) {
      res.status(404).json({
        message: "Item not found.",
      });

      return;
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete item.",
    });
  }
};