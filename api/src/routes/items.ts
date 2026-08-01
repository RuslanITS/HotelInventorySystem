import { Router } from "express";

import {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  updateItem,
} from "../controllers/itemsController";
import { upload } from "../middleware/upload";

const router = Router();

router.get("/", getAllItems);

router.get("/:id", getItemById);

router.post("/", upload.single("image"), createItem);

router.put("/:id", upload.single("image"), updateItem);

router.delete("/:id", deleteItem);

export default router;
