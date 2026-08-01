import express from "express";
import cors from "cors";
import path from "node:path";

import { PORT } from "./constants";

import categoriesRouter from "./routes/categories";
import locationsRouter from "./routes/locations";
import itemsRouter from "./routes/items";
import { database } from "./database";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));

app.use("/categories", categoriesRouter);
app.use("/locations", locationsRouter);
app.use("/items", itemsRouter);

const start = async (): Promise<void> => {
  try {
    const connection = await database.getConnection();
    connection.release();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown database error.";
    console.error(`Database connection failed: ${message}`);
    process.exitCode = 1;
  }
};

void start();
