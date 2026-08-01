import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { database } from "../database";
import type { Location, LocationPayload, ResourceSummary } from "../types";

interface LocationRow extends RowDataPacket, Location {}

export type LocationRemovalResult = "deleted" | "notFound";

export const getAll = async (): Promise<ResourceSummary[]> => {
  const [rows] = await database.execute<LocationRow[]>(
    "SELECT id, name FROM locations ORDER BY name",
  );
  return rows.map(({ id, name }) => ({ id, name }));
};

export const getById = async (id: string): Promise<Location | null> => {
  const [rows] = await database.execute<LocationRow[]>(
    "SELECT id, name, description FROM locations WHERE id = ? LIMIT 1",
    [id],
  );
  return rows[0] ?? null;
};

export const create = async (locationData: LocationPayload): Promise<Location> => {
  const location: Location = { id: crypto.randomUUID(), ...locationData };
  await database.execute<ResultSetHeader>(
    "INSERT INTO locations (id, name, description) VALUES (?, ?, ?)",
    [location.id, location.name, location.description],
  );
  return location;
};

export const update = async (id: string, locationData: LocationPayload): Promise<Location | null> => {
  const [result] = await database.execute<ResultSetHeader>(
    "UPDATE locations SET name = ?, description = ? WHERE id = ?",
    [locationData.name, locationData.description, id],
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return { id, ...locationData };
};

export const remove = async (id: string): Promise<LocationRemovalResult> => {
  const [result] = await database.execute<ResultSetHeader>(
    "DELETE FROM locations WHERE id = ?",
    [id],
  );
  return result.affectedRows === 0 ? "notFound" : "deleted";
};
