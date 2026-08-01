import { createSlice } from "@reduxjs/toolkit";

import type { LocationsState } from "../../types";

import {
  createLocation,
  deleteLocation,
  fetchLocationById,
  fetchLocations,
  updateLocation,
} from "../../store/locations/locationsThunks.ts";

const initialState: LocationsState = {
  items: [],
  item: null,

  fetchLoading: false,
  fetchOneLoading: false,

  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchLocations.pending, (state) => {
        state.fetchLoading = true;
      })

      .addCase(fetchLocations.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })

      .addCase(fetchLocations.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(fetchLocationById.pending, (state) => {
        state.fetchOneLoading = true;
      })

      .addCase(fetchLocationById.fulfilled, (state, { payload }) => {
        state.fetchOneLoading = false;
        state.item = payload;
      })

      .addCase(fetchLocationById.rejected, (state) => {
        state.fetchOneLoading = false;
      })

      .addCase(createLocation.pending, (state) => {
        state.createLoading = true;
      })

      .addCase(createLocation.fulfilled, (state, { payload }) => {
        state.createLoading = false;
        state.items.push(payload);
      })

      .addCase(createLocation.rejected, (state) => {
        state.createLoading = false;
      })

      .addCase(updateLocation.pending, (state) => {
        state.updateLoading = true;
      })

      .addCase(updateLocation.fulfilled, (state, { payload }) => {
        state.updateLoading = false;

        const index = state.items.findIndex(
          (location) => location.id === payload.id,
        );

        if (index !== -1) {
          state.items[index] = payload;
        }

        state.item = payload;
      })

      .addCase(updateLocation.rejected, (state) => {
        state.updateLoading = false;
      })

      .addCase(deleteLocation.pending, (state) => {
        state.deleteLoading = true;
      })

      .addCase(deleteLocation.fulfilled, (state, { payload }) => {
        state.deleteLoading = false;

        state.items = state.items.filter(
          (location) => location.id !== payload,
        );
      })

      .addCase(deleteLocation.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const locationsReducer = locationsSlice.reducer;
