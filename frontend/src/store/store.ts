import { configureStore } from "@reduxjs/toolkit";

import { categoriesReducer } from "../store/categories/categoriesSlice.ts";
import { locationsReducer } from "../store/locations/locationsSlice.ts";
import { itemsReducer } from "../store/items/itemsSlice.ts";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    locations: locationsReducer,
    items: itemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;