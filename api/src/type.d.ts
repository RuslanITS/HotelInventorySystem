export interface Category {
  id: string;
  name: string;
  description: string;
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

export interface ItemApi {
  name: string;
  description: string;
  categoryId: string;
  locationId: string;
  image: string | null;
}