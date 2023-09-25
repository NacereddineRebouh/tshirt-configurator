import { configureStore } from "@reduxjs/toolkit";
import shirtSlice from "../slices/targetSlice";

export const store = configureStore({
  reducer: {
    shirt: shirtSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
