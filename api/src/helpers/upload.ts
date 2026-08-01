import { unlink } from "node:fs";
import path from "node:path";

import { UPLOADS_PATH } from "../constants";

export const removeUploadedFile = async (
  imagePath: string | null,
): Promise<void> => {
  if (!imagePath) {
    return;
  }

  const fileName = path.basename(imagePath);
  const filePath = path.join(UPLOADS_PATH, fileName);

  await new Promise<void>((resolve, reject) => {
    unlink(filePath, (error) => {
      if (!error || error.code === "ENOENT") {
        resolve();
        return;
      }
      reject(error);
    });
  });
};
