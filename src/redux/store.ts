import { configureStore } from "@reduxjs/toolkit";
import clientesReducer from "./slices/clientesSlice";
import equipamentosReducer from "./slices/equipamentosSlice";

export const store = configureStore({
  reducer: {
    clientes: clientesReducer,
    equipamentos: equipamentosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
