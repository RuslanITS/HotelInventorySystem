import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../api/axiosApi.ts";

import type {
  Category,
  CategoryApi,
  ResourceSummary,
} from "../../types";

export const fetchCategories = createAsyncThunk<
  Category[]
>(
  "categories/fetchAll",
  async () => {
    const response = await axiosApi.get<ResourceSummary[]>("/categories");
    const categories = await Promise.all(
      response.data.map(async ({ id }) => {
        const categoryResponse = await axiosApi.get<Category>(`/categories/${id}`);
        return categoryResponse.data;
      }),
    );
    return categories;
  },
);

export const fetchCategoryById = createAsyncThunk<
  Category,
  string
>(
  "categories/fetchById",
  async (id) => {
    const response = await axiosApi.get<Category>(
      `/categories/${id}`,
    );

    return response.data;
  },
);

export const createCategory = createAsyncThunk<
  Category,
  CategoryApi
>(
  "categories/create",
  async (categoryData) => {
    const response = await axiosApi.post<Category>(
      "/categories",
      categoryData,
    );

    return response.data;
  },
);

export const updateCategory = createAsyncThunk<
  Category,
  {
    id: string;
    category: CategoryApi;
  }
>(
  "categories/update",
  async ({ id, category }) => {
    const response = await axiosApi.put<Category>(
      `/categories/${id}`,
      category,
    );

    return response.data;
  },
);

export const deleteCategory = createAsyncThunk<
  string,
  string
>(
  "categories/delete",
  async (id) => {
    await axiosApi.delete(`/categories/${id}`);

    return id;
  },
);
