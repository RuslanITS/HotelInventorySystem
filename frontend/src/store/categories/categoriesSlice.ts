import { createSlice } from "@reduxjs/toolkit";

import type { CategoriesState } from "../../types";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  fetchCategoryById,
  updateCategory,
} from "../../store/categories/categoriesThunks.ts";

const initialState: CategoriesState = {
  items: [],
  item: null,

  fetchLoading: false,
  fetchOneLoading: false,

  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchCategories.pending, (state) => {
        state.fetchLoading = true;
      })

      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })

      .addCase(fetchCategories.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(fetchCategoryById.pending, (state) => {
        state.fetchOneLoading = true;
      })

      .addCase(fetchCategoryById.fulfilled, (state, { payload }) => {
        state.fetchOneLoading = false;
        state.item = payload;
      })

      .addCase(fetchCategoryById.rejected, (state) => {
        state.fetchOneLoading = false;
      })

      .addCase(createCategory.pending, (state) => {
        state.createLoading = true;
      })

      .addCase(createCategory.fulfilled, (state) => {
        state.createLoading = false;
      })

      .addCase(createCategory.rejected, (state) => {
        state.createLoading = false;
      })

      .addCase(updateCategory.pending, (state) => {
        state.updateLoading = true;
      })

      .addCase(updateCategory.fulfilled, (state) => {
        state.updateLoading = false;
      })

      .addCase(updateCategory.rejected, (state) => {
        state.updateLoading = false;
      })

      .addCase(deleteCategory.pending, (state) => {
        state.deleteLoading = true;
      })

      .addCase(deleteCategory.fulfilled, (state) => {
        state.deleteLoading = false;
      })

      .addCase(deleteCategory.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
