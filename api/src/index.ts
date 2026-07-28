import express from "express";
import cors from "cors";

import {PORT} from "./constants";

const app = express();

app.use(cors());
app.use(express.json());


const start = async () => {

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

void start();