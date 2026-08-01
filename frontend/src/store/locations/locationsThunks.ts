import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../api/axiosApi.ts";

import type {
  Location,
  LocationApi,
  ResourceSummary,
} from "../../types";

export const fetchLocations = createAsyncThunk<
  Location[]
>(
  "locations/fetchAll",
  async () => {
    const response = await axiosApi.get<ResourceSummary[]>("/locations");
    const locations = await Promise.all(
      response.data.map(async ({ id }) => {
        const locationResponse = await axiosApi.get<Location>(`/locations/${id}`);
        return locationResponse.data;
      }),
    );
    return locations;
  },
);

export const fetchLocationById = createAsyncThunk<
  Location,
  string
>(
  "locations/fetchById",
  async (id) => {
    const response = await axiosApi.get<Location>(
      `/locations/${id}`,
    );

    return response.data;
  },
);

export const createLocation = createAsyncThunk<
  Location,
  LocationApi
>(
  "locations/create",
  async (locationData) => {
    const response = await axiosApi.post<Location>(
      "/locations",
      locationData,
    );

    return response.data;
  },
);

export const updateLocation = createAsyncThunk<
  Location,
  {
    id: string;
    location: LocationApi;
  }
>(
  "locations/update",
  async ({ id, location }) => {
    const response = await axiosApi.put<Location>(
      `/locations/${id}`,
      location,
    );

    return response.data;
  },
);

export const deleteLocation = createAsyncThunk<
  string,
  string
>(
  "locations/delete",
  async (id) => {
    await axiosApi.delete(`/locations/${id}`);

    return id;
  },
);
