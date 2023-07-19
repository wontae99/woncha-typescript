import { createSlice } from "@reduxjs/toolkit";
import { ItemState } from "../lib/types";

const initialItemState: ItemState = {
  items: [],
  changed: false,
  isAdded: null,
};

const itemSlice = createSlice({
  name: "item",
  initialState: initialItemState,
  reducers: {
    replaceItem(state, action) {
      state.items = action.payload.items;
    },
    toggleItem(state, action) {
      const { type, contentId } = action.payload;
      const existingItem = state.items.find(
        (item) => item.type === type && item.id === contentId
      );
      if (!existingItem) {
        state.items.push({
          type: type,
          id: contentId,
        });
        state.isAdded = true;
      } else {
        state.items = state.items.filter(
          (item) =>
            item.id !== contentId ||
            (item.id === contentId && item.type !== type)
        );
        state.isAdded = false;
      }
      state.changed = true;
    },
    checkIsAdded(state, action) {
      const { type, contentId } = action.payload;
      const existingItem = state.items?.find(
        (item) => item.type === type && item.id === contentId
      );
      if (existingItem) {
        state.isAdded = true;
      } else {
        state.isAdded = false;
      }
    },
  },
});

export const itemActions = itemSlice.actions;
export const itemReducer = itemSlice.reducer;
