import express from "express";
import cors from "cors";

import { PORT } from "./constants";

import categoriesRouter from "./routes/categories";
import locationsRouter from "./routes/locations";
import itemsRouter from "./routes/items";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/categories", categoriesRouter);
app.use("/locations", locationsRouter);
app.use("/items", itemsRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});