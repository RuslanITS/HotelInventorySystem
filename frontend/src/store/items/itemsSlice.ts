import { createSlice } from "@reduxjs/toolkit";

import type { ItemsState } from "../../types";

import {
  createItem,
  deleteItem,
  fetchItemById,
  fetchItems,
  updateItem,
} from "../../store/items/itemsThunks.ts";

const initialState: ItemsState = {
  items: [],
  item: null,

  fetchLoading: false,
  fetchOneLoading: false,

  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchItems.pending, (state) => {
        state.fetchLoading = true;
      })

      .addCase(fetchItems.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })

      .addCase(fetchItems.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(fetchItemById.pending, (state) => {
        state.fetchOneLoading = true;
      })

      .addCase(fetchItemById.fulfilled, (state, { payload }) => {
        state.fetchOneLoading = false;
        state.item = payload;
      })

      .addCase(fetchItemById.rejected, (state) => {
        state.fetchOneLoading = false;
      })

      .addCase(createItem.pending, (state) => {
        state.createLoading = true;
      })

      .addCase(createItem.fulfilled, (state, { payload }) => {
        state.createLoading = false;
        state.items.push(payload);
      })

      .addCase(createItem.rejected, (state) => {
        state.createLoading = false;
      })

      .addCase(updateItem.pending, (state) => {
        state.updateLoading = true;
      })

      .addCase(updateItem.fulfilled, (state, { payload }) => {
        state.updateLoading = false;

        const index = state.items.findIndex(
          (item) => item.id === payload.id,
        );

        if (index !== -1) {
          state.items[index] = payload;
        }

        state.item = payload;
      })

      .addCase(updateItem.rejected, (state) => {
        state.updateLoading = false;
      })

      .addCase(deleteItem.pending, (state) => {
        state.deleteLoading = true;
      })

      .addCase(deleteItem.fulfilled, (state, { payload }) => {
        state.deleteLoading = false;

        state.items = state.items.filter(
          (item) => item.id !== payload,
        );
      })

      .addCase(deleteItem.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const itemsReducer = itemsSlice.reducer;
