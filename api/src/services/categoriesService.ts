import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { database } from "../database";
import type { Category, CategoryPayload, ResourceSummary } from "../types";

interface CategoryRow extends RowDataPacket, Category {}

export type CategoryRemovalResult = "deleted" | "notFound";

export const getAll = async (): Promise<ResourceSummary[]> => {
  const [rows] = await database.execute<CategoryRow[]>(
    "SELECT id, name FROM categories ORDER BY name",
  );
  return rows.map(({ id, name }) => ({ id, name }));
};

export const getById = async (id: string): Promise<Category | null> => {
  const [rows] = await database.execute<CategoryRow[]>(
    "SELECT id, name, description FROM categories WHERE id = ? LIMIT 1",
    [id],
  );
  return rows[0] ?? null;
};

export const create = async (categoryData: CategoryPayload): Promise<Category> => {
  const category: Category = { id: crypto.randomUUID(), ...categoryData };
  await database.execute<ResultSetHeader>(
    "INSERT INTO categories (id, name, description) VALUES (?, ?, ?)",
    [category.id, category.name, category.description],
  );
  return category;
};

export const update = async (id: string, categoryData: CategoryPayload): Promise<Category | null> => {
  const [result] = await database.execute<ResultSetHeader>(
    "UPDATE categories SET name = ?, description = ? WHERE id = ?",
    [categoryData.name, categoryData.description, id],
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return { id, ...categoryData };
};

export const remove = async (id: string): Promise<CategoryRemovalResult> => {
  const [result] = await database.execute<ResultSetHeader>(
    "DELETE FROM categories WHERE id = ?",
    [id],
  );
  return result.affectedRows === 0 ? "notFound" : "deleted";
};
