// src/lib/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { turfApi } from "./turfApi";
import { weatherApi } from "./weatherApi";

export const store = configureStore({
  reducer: {
    [turfApi.reducerPath]: turfApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (gDM) => gDM().concat(turfApi.middleware, weatherApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
