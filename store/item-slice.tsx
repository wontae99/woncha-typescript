import { createSlice } from "@reduxjs/toolkit";
import { ItemState } from "../lib/types";

const initialItemState: ItemState = {
  items: [],
  changed: false,
  isAdded: false,
};

const itemSlice = createSlice({
  name: "item",
  initialState: initialItemState,
  reducers: {
    replaceItem(state, action) {
      state.items = action.payload.items;
    },
    addItem(state, action) {
      const newItem = action.payload;
      state.changed = true;
      state.items.push(newItem);
    },
    deleteItem(state, action) {
      const { type, id } = action.payload;
      state.changed = true;
      state.items = state.items.filter(
        (item) => item.id !== id || item.type !== type
      );
    },
    checkIsAdded(state, action) {
      const { type, contentId } = action.payload;
      const existingItem = state.items?.find(
        (item) => item.type === type && item.id === contentId
      );
      state.isAdded = !!existingItem;
    },
    // toggleItem(state, action) {
    //   const { type, id } = action.payload;
    //   const existingItem = state.items.find(
    //     (item) => item.type === type && item.id === id
    //   );
    //   if (!existingItem) {
    //     state.items.push({
    //       type,
    //       id,
    //     });
    //     state.isAdded = true;
    //   } else {
    //     state.items = state.items.filter((item) => item !== action.payload);
    //     state.isAdded = false;
    //   }
    //   state.changed = true;
    // },
  },
});

export const itemActions = itemSlice.actions;
export const itemReducer = itemSlice.reducer;
