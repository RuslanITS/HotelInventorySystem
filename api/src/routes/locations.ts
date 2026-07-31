import { Router } from "express";

import {
  createLocation,
  deleteLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
} from "../controllers/locationsController";

const router = Router();

router.get("/", getAllLocations);

router.get("/:id", getLocationById);

router.post("/", createLocation);

router.put("/:id", updateLocation);

router.delete("/:id", deleteLocation);

export default router;