export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface CategoryPayload {
  name: string;
  description: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
}

export interface LocationPayload {
  name: string;
  description: string;
}

export interface Item {
  id: string;
  categoryId: string;
  locationId: string;
  name: string;
  description: string;
  image: string | null;
  createdAt: string;
}

export interface ItemPayload {
  categoryId: string;
  locationId: string;
  name: string;
  description: string;
  createdAt: string;
  image: string | null;
}

export interface ResourceSummary {
  id: string;
  name: string;
}

export interface ItemSummary extends ResourceSummary {
  categoryId: string;
  locationId: string;
}
