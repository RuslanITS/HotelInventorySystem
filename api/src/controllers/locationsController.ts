import type { Request, Response } from "express";

import { isForeignKeyConstraintError } from "../database";
import * as locationsService from "../services/locationsService";
import type { LocationPayload } from "../types";

interface IdParams {
  id: string;
}

const isLocationPayload = (value: LocationPayload): boolean => {
  return Boolean(value.name.trim()) && Boolean(value.description.trim());
};

export const getAllLocations = async (_request: Request, response: Response): Promise<void> => {
  try {
    response.json(await locationsService.getAll());
  } catch {
    response.status(500).json({ message: "Failed to fetch locations." });
  }
};

export const getLocationById = async (request: Request<IdParams>, response: Response): Promise<void> => {
  try {
    const location = await locationsService.getById(request.params.id);
    if (!location) {
      response.status(404).json({ message: "Location not found." });
      return;
    }
    response.json(location);
  } catch {
    response.status(500).json({ message: "Failed to fetch location." });
  }
};

export const createLocation = async (
  request: Request<Record<string, never>, unknown, LocationPayload>,
  response: Response,
): Promise<void> => {
  if (!isLocationPayload(request.body)) {
    response.status(400).json({ message: "Name and description are required." });
    return;
  }
  try {
    response.status(201).json(await locationsService.create(request.body));
  } catch {
    response.status(500).json({ message: "Failed to create location." });
  }
};

export const updateLocation = async (
  request: Request<IdParams, unknown, LocationPayload>,
  response: Response,
): Promise<void> => {
  if (!isLocationPayload(request.body)) {
    response.status(400).json({ message: "Name and description are required." });
    return;
  }
  try {
    const location = await locationsService.update(request.params.id, request.body);
    if (!location) {
      response.status(404).json({ message: "Location not found." });
      return;
    }
    response.json(location);
  } catch {
    response.status(500).json({ message: "Failed to update location." });
  }
};

export const deleteLocation = async (request: Request<IdParams>, response: Response): Promise<void> => {
  try {
    const result = await locationsService.remove(request.params.id);
    if (result === "notFound") {
      response.status(404).json({ message: "Location not found." });
      return;
    }
    response.sendStatus(204);
  } catch (error: unknown) {
    if (isForeignKeyConstraintError(error)) {
      response.status(409).json({ message: "Location is used by inventory items." });
      return;
    }
    response.status(500).json({ message: "Failed to delete location." });
  }
};
