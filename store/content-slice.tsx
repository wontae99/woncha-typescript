import { createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
  name: "content",
  initialState: {
    contents: {
      movies: { trending: [], topRated: [] },
      tvShows: { trending: [], topRated: [] },
    },
    contentList: [],
  },
  reducers: {
    setContents(state, action) {
      state.contents = action.payload;
    },
  },
});

export const contentActions = contentSlice.actions;
export const contentReducer = contentSlice.reducer;
