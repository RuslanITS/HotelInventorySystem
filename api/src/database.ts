import mysql from "mysql2/promise";

const port = Number.parseInt(process.env.DB_PORT ?? "3306", 10);

export const database = mysql.createPool({
  host: process.env.DB_HOST ?? "localhost",
  port: Number.isNaN(port) ? 3306 : port,
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "office_inventory",
  waitForConnections: true,
  connectionLimit: 10,
  dateStrings: true,
});

export const isForeignKeyConstraintError = (error: unknown): boolean => {
  return error instanceof Error && "code" in error && error.code === "ER_ROW_IS_REFERENCED_2";
};

export const isMissingReferenceError = (error: unknown): boolean => {
  return error instanceof Error && "code" in error && error.code === "ER_NO_REFERENCED_ROW_2";
};
