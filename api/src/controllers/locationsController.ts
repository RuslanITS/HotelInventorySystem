import { Request, Response } from "express";

import * as locationsService from "../services/locationsService";
import { LocationApi } from "../type";

interface IdParams {
  id: string;
}

export const getAllLocations = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const locations = await locationsService.getAll();

    res.status(200).json(locations);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch locations.",
    });
  }
};

export const getLocationById = async (
  req: Request<IdParams>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const location = await locationsService.getById(id);

    if (!location) {
      res.status(404).json({
        message: "Location not found.",
      });

      return;
    }

    res.status(200).json(location);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch location.",
    });
  }
};

export const createLocation = async (
  req: Request<{}, {}, LocationApi>,
  res: Response,
): Promise<void> => {
  try {
    const location = await locationsService.create(req.body);

    res.status(201).json(location);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create location.",
    });
  }
};

export const updateLocation = async (
  req: Request<IdParams, {}, LocationApi>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const location = await locationsService.update(id, req.body);

    if (!location) {
      res.status(404).json({
        message: "Location not found.",
      });

      return;
    }

    res.status(200).json(location);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update location.",
    });
  }
};

export const deleteLocation = async (
  req: Request<IdParams>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const deleted = await locationsService.remove(id);

    if (!deleted) {
      res.status(404).json({
        message: "Location not found.",
      });

      return;
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete location.",
    });
  }
};