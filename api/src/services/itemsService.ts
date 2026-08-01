import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { database } from "../database";
import { removeUploadedFile } from "../helpers/upload";
import type { Item, ItemPayload, ItemSummary } from "../types";

interface ItemRow extends RowDataPacket, Item {}

export const getAll = async (): Promise<ItemSummary[]> => {
  const [rows] = await database.execute<ItemRow[]>(
    "SELECT id, name, category_id AS categoryId, location_id AS locationId FROM items ORDER BY created_at DESC, name",
  );
  return rows.map(({ id, name, categoryId, locationId }) => ({ id, name, categoryId, locationId }));
};

export const getById = async (id: string): Promise<Item | null> => {
  const [rows] = await database.execute<ItemRow[]>(
    "SELECT id, category_id AS categoryId, location_id AS locationId, name, description, image, created_at AS createdAt FROM items WHERE id = ? LIMIT 1",
    [id],
  );
  return rows[0] ?? null;
};

export const discardImage = async (imagePath: string | null): Promise<void> => {
  await removeUploadedFile(imagePath);
};

export const create = async (itemData: ItemPayload): Promise<Item> => {
  const item: Item = { id: crypto.randomUUID(), ...itemData };
  await database.execute<ResultSetHeader>(
    "INSERT INTO items (id, category_id, location_id, name, description, image, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      item.id,
      item.categoryId,
      item.locationId,
      item.name,
      item.description,
      item.image,
      item.createdAt,
    ],
  );
  return item;
};

export const update = async (id: string, itemData: ItemPayload): Promise<Item | null> => {
  const existingItem = await getById(id);
  if (!existingItem) {
    return null;
  }

  await database.execute<ResultSetHeader>(
    "UPDATE items SET category_id = ?, location_id = ?, name = ?, description = ?, image = ?, created_at = ? WHERE id = ?",
    [
      itemData.categoryId,
      itemData.locationId,
      itemData.name,
      itemData.description,
      itemData.image,
      itemData.createdAt,
      id,
    ],
  );

  if (existingItem.image !== itemData.image) {
    await removeUploadedFile(existingItem.image);
  }

  return { id, ...itemData };
};

export const remove = async (id: string): Promise<boolean> => {
  const item = await getById(id);
  if (!item) {
    return false;
  }

  await database.execute<ResultSetHeader>("DELETE FROM items WHERE id = ?", [id]);
  await removeUploadedFile(item.image);
  return true;
};
