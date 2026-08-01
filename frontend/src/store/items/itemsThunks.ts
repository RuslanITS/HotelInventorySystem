import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../api/axiosApi.ts";

import type {
  Item,
  ItemApi,
  ItemSummary,
} from "../../types";

export const fetchItems = createAsyncThunk<
  Item[]
>(
  "items/fetchAll",
  async () => {
    const response = await axiosApi.get<ItemSummary[]>("/items");
    const items = await Promise.all(
      response.data.map(async ({ id }) => {
        const itemResponse = await axiosApi.get<Item>(`/items/${id}`);
        return itemResponse.data;
      }),
    );
    return items;
  },
);

export const fetchItemById = createAsyncThunk<
  Item,
  string
>(
  "items/fetchById",
  async (id) => {
    const response = await axiosApi.get<Item>(
      `/items/${id}`,
    );

    return response.data;
  },
);

export const createItem = createAsyncThunk<
  Item,
  ItemApi
>(
  "items/create",
  async (itemData) => {
    const formData = new FormData();

    formData.append("name", itemData.name);
    formData.append("description", itemData.description);
    formData.append("categoryId", itemData.categoryId);
    formData.append("locationId", itemData.locationId);
    formData.append("createdAt", itemData.createdAt);

    if (itemData.image) {
      formData.append("image", itemData.image);
    }

    const response = await axiosApi.post<Item>(
      "/items",
      formData,
    );

    return response.data;
  },
);

export const updateItem = createAsyncThunk<
  Item,
  {
    id: string;
    item: ItemApi;
  }
>(
  "items/update",
  async ({ id, item }) => {
    const formData = new FormData();

    formData.append("name", item.name);
    formData.append("description", item.description);
    formData.append("categoryId", item.categoryId);
    formData.append("locationId", item.locationId);
    formData.append("createdAt", item.createdAt);

    if (item.image) {
      formData.append("image", item.image);
    }

    const response = await axiosApi.put<Item>(
      `/items/${id}`,
      formData,
    );

    return response.data;
  },
);

export const deleteItem = createAsyncThunk<
  string,
  string
>(
  "items/delete",
  async (id) => {
    await axiosApi.delete(`/items/${id}`);

    return id;
  },
);
