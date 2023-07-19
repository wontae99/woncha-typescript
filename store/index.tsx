import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { itemReducer } from "./item-slice";
import { uiReducer } from "./ui-slice";
import { contentReducer } from "./content-slice";

export const store = configureStore({
  reducer: { ui: uiReducer, item: itemReducer, content: contentReducer },
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
