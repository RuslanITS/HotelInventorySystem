import type { Request, Response } from "express";

import { isForeignKeyConstraintError } from "../database";
import * as categoriesService from "../services/categoriesService";
import type { CategoryPayload } from "../types";

interface IdParams {
  id: string;
}

const isCategoryPayload = (value: CategoryPayload): boolean => {
  return Boolean(value.name.trim()) && Boolean(value.description.trim());
};

export const getAllCategories = async (
  _request: Request,
  response: Response,
): Promise<void> => {
  try {
    response.json(await categoriesService.getAll());
  } catch {
    response.status(500).json({ message: "Failed to fetch categories." });
  }
};

export const getCategoryById = async (
  request: Request<IdParams>,
  response: Response,
): Promise<void> => {
  try {
    const category = await categoriesService.getById(request.params.id);
    if (!category) {
      response.status(404).json({ message: "Category not found." });
      return;
    }
    response.json(category);
  } catch {
    response.status(500).json({ message: "Failed to fetch category." });
  }
};

export const createCategory = async (
  request: Request<Record<string, never>, unknown, CategoryPayload>,
  response: Response,
): Promise<void> => {
  if (!isCategoryPayload(request.body)) {
    response.status(400).json({ message: "Name and description are required." });
    return;
  }
  try {
    response.status(201).json(await categoriesService.create(request.body));
  } catch {
    response.status(500).json({ message: "Failed to create category." });
  }
};

export const updateCategory = async (
  request: Request<IdParams, unknown, CategoryPayload>,
  response: Response,
): Promise<void> => {
  if (!isCategoryPayload(request.body)) {
    response.status(400).json({ message: "Name and description are required." });
    return;
  }
  try {
    const category = await categoriesService.update(request.params.id, request.body);
    if (!category) {
      response.status(404).json({ message: "Category not found." });
      return;
    }
    response.json(category);
  } catch {
    response.status(500).json({ message: "Failed to update category." });
  }
};

export const deleteCategory = async (
  request: Request<IdParams>,
  response: Response,
): Promise<void> => {
  try {
    const result = await categoriesService.remove(request.params.id);
    if (result === "notFound") {
      response.status(404).json({ message: "Category not found." });
      return;
    }
    response.sendStatus(204);
  } catch (error: unknown) {
    if (isForeignKeyConstraintError(error)) {
      response.status(409).json({ message: "Category is used by inventory items." });
      return;
    }
    response.status(500).json({ message: "Failed to delete category." });
  }
};
