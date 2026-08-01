export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface ResourceSummary {
  id: string;
  name: string;
}

export interface CategoryApi {
  name: string;
  description: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
}

export interface LocationApi {
  name: string;
  description: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  locationId: string;
  image: string | null;
  createdAt: string;
}

export interface ItemSummary extends ResourceSummary {
  categoryId: string;
  locationId: string;
}

export interface ItemApi {
  name: string;
  description: string;
  categoryId: string;
  locationId: string;
  createdAt: string;
  image: File | null;
}

export interface CategoriesState {
  items: Category[];
  item: Category | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}

export interface LocationsState {
  items: Location[];
  item: Location | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}

export interface ItemsState {
  items: Item[];
  item: Item | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}
