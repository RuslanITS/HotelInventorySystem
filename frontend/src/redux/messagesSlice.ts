import {createSlice} from "@reduxjs/toolkit";
import {fetchMessages, createMessage} from "./messagesThunks";
import type {Message} from "../type";

interface MessagesState {
  messages: Message[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  fetchLoading: false,
  createLoading: false,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchMessages.pending, (state) => {
        state.fetchLoading = true;
      })

      .addCase(fetchMessages.fulfilled, (state, {payload}) => {
        state.fetchLoading = false;
        state.messages = payload;
      })

      .addCase(fetchMessages.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(createMessage.pending, (state) => {
        state.createLoading = true;
      })

      .addCase(createMessage.fulfilled, (state) => {
        state.createLoading = false;
      })

      .addCase(createMessage.rejected, (state) => {
        state.createLoading = false;
      });
  },
});

export const messagesReducer = messagesSlice.reducer;