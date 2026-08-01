import path from "node:path";

import multer from "multer";

import { UPLOADS_PATH } from "../constants";

const storage = multer.diskStorage({
  destination: UPLOADS_PATH,
  filename: (_request, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${crypto.randomUUID()}${extension}`);
  },
});

const imageFilter: multer.Options["fileFilter"] = (
  _request,
  file,
  callback,
) => {
  callback(null, file.mimetype.startsWith("image/"));
};

export const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
