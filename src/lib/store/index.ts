// src/lib/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { turfApi } from "./turfApi";

export const store = configureStore({
  reducer: { [turfApi.reducerPath]: turfApi.reducer },
  middleware: (gDM) => gDM().concat(turfApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
