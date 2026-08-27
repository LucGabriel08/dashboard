import { configureStore } from "@reduxjs/toolkit";
import clientesReducer from "./slices/clientesSlice";

export const store = configureStore({
  reducer: {
    clientes: clientesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
