import { promises as fs } from "fs";
import path from "path";

import {
  Category,
  Item,
  Location,
} from "../type";

import {
  DB_PATH,
  CATEGORIES_FILE,
  LOCATIONS_FILE,
  ITEMS_FILE,
} from "../constants";

const getFilePath = (fileName: string): string => {
  return path.join(DB_PATH, fileName);
};

const readFile = async <T>(fileName: string): Promise<T[]> => {
  const filePath = getFilePath(fileName);

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");

    return JSON.parse(fileContent) as T[];
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") {
      await fs.writeFile(filePath, "[]");
      return [];
    }

    throw e;
  }
};

const writeFile = async <T>(
  fileName: string,
  data: T[],
): Promise<void> => {
  const filePath = getFilePath(fileName);

  await fs.writeFile(
    filePath,
    JSON.stringify(data, null, 2),
    "utf-8",
  );
};

export const getCategories = async (): Promise<Category[]> => {
  return readFile<Category>(CATEGORIES_FILE);
};

export const saveCategories = async (
  categories: Category[],
): Promise<void> => {
  await writeFile(CATEGORIES_FILE, categories);
};

export const getLocations = async (): Promise<Location[]> => {
  return readFile<Location>(LOCATIONS_FILE);
};

export const saveLocations = async (
  locations: Location[],
): Promise<void> => {
  await writeFile(LOCATIONS_FILE, locations);
};

export const getItems = async (): Promise<Item[]> => {
  return readFile<Item>(ITEMS_FILE);
};

export const saveItems = async (
  items: Item[],
): Promise<void> => {
  await writeFile(ITEMS_FILE, items);
};