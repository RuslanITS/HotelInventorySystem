import * as fileDb from "../helpers/fileDb";
import { Item, ItemApi } from "../type";

export const getAll = async (): Promise<Item[]> => {
  return await fileDb.getItems();
};

export const getById = async (
  id: string,
): Promise<Item | null> => {
  const items = await fileDb.getItems();

  return items.find((item) => item.id === id) || null;
};

export const create = async (
  itemData: ItemApi,
): Promise<Item> => {
  const items = await fileDb.getItems();

  const newItem: Item = {
    id: crypto.randomUUID(),
    ...itemData,
    createdAt: new Date().toISOString(),
  };

  items.push(newItem);

  await fileDb.saveItems(items);

  return newItem;
};

export const update = async (
  id: string,
  itemData: ItemApi,
): Promise<Item | null> => {
  const items = await fileDb.getItems();

  const item = items.find((item) => item.id === id);

  if (!item) {
    return null;
  }

  item.name = itemData.name;
  item.description = itemData.description;
  item.categoryId = itemData.categoryId;
  item.locationId = itemData.locationId;
  item.image = itemData.image;

  await fileDb.saveItems(items);

  return item;
};

export const remove = async (
  id: string,
): Promise<boolean> => {
  const items = await fileDb.getItems();

  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return false;
  }

  items.splice(index, 1);

  await fileDb.saveItems(items);

  return true;
};