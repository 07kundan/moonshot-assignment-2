import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "@/store/features/loading.slice";
// Global state
export const makeStore = () => {
  return configureStore({
    reducer: {
      loading: loadingSlice,
    },
  });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
