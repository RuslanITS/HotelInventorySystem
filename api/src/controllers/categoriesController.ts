import { Request, Response } from "express";

import * as categoriesService from "../services/categoriesService";
import { CategoryApi } from "../type";

interface IdParams {
  id: string;
}

export const getAllCategories = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const categories = await categoriesService.getAll();

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch categories.",
    });
  }
};

export const getCategoryById = async (
  req: Request<IdParams>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const category = await categoriesService.getById(id);

    if (!category) {
      res.status(404).json({
        message: "Category not found.",
      });

      return;
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch category.",
    });
  }
};

export const createCategory = async (
  req: Request<{}, {}, CategoryApi>,
  res: Response,
): Promise<void> => {
  try {
    const category = await categoriesService.create(req.body);

    res.status(201).json(category);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create category.",
    });
  }
};

export const updateCategory = async (
  req: Request<IdParams, {}, CategoryApi>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const category = await categoriesService.update(id, req.body);

    if (!category) {
      res.status(404).json({
        message: "Category not found.",
      });

      return;
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update category.",
    });
  }
};

export const deleteCategory = async (
  req: Request<IdParams>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const deleted = await categoriesService.remove(id);

    if (!deleted) {
      res.status(404).json({
        message: "Category not found.",
      });

      return;
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete category.",
    });
  }
};