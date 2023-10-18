import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    notification: { message: "", isShown: false },
    showSearch: false,
  },
  reducers: {
    showNotification(state, action) {
      state.notification.isShown = true;

      state.notification.message = action.payload.message;
    },
    unshownNotif(state) {
      state.notification.isShown = false;
    },
    toggleSearch(state) {
      state.showSearch = !state.showSearch;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
