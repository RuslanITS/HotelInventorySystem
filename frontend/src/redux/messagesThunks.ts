import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../api/axios.ts";
import type {Message, MessageMutation} from "../type";

export const fetchMessages = createAsyncThunk<Message[]>(
  "db/fetchAll",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const {data} = await axiosApi.get<Message[]>("/messages");

    return data;
  }
);

export const createMessage = createAsyncThunk<
  void,
  MessageMutation
>(
  "db/create",
  async (messageMutation) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const formData = new FormData();

    formData.append("author", messageMutation.author);
    formData.append("message", messageMutation.message);

    if (messageMutation.image) {
      formData.append("image", messageMutation.image);
    }

    await axiosApi.post("/messages", formData);
  }
);