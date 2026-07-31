import express from "express";
import cors from "cors";

import { PORT } from "./constants";
import categoriesRouter from "./routes/categories";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/categories", categoriesRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});