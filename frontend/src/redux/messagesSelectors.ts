import type {RootState} from "../../app/store";

export const selectMessages = (state: RootState) => state.messages.messages;

export const selectFetchLoading = (state: RootState) =>
  state.messages.fetchLoading;

export const selectCreateLoading = (state: RootState) =>
  state.messages.createLoading;