import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    notification: { message: "", isShown: false },
    myList: { showMovie: false, showTV: false },
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
    toggleMovieList(state) {
      state.myList.showMovie = !state.myList.showMovie;
    },
    toggleTVList(state) {
      state.myList.showTV = !state.myList.showTV;
    },
    toggleSearch(state) {
      state.showSearch = !state.showSearch;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
