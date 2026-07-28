import express from "express";

import fileDb from "../fileDb";
import upload from "../middleware/multer";
import type {MessageWithoutId} from "../type";

const messagesRouter = express.Router();

messagesRouter.get("/", async (_req, res) => {
  const messages = await fileDb.getMessages();

  res.send(messages);
});

messagesRouter.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    const {author, message} = req.body;

    if (!message || !message.trim()) {
      return res.status(400).send({
        error: "Message is required",
      });
    }

    const newMessage: MessageWithoutId = {
      author: author ?? "",
      message: message.trim(),
      image: req.file ? `images/${req.file.filename}` : null,
    };

    const savedMessage = await fileDb.addMessage(newMessage);

    res.send(savedMessage);
  },
);

export default messagesRouter;