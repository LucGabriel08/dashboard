import { configureStore } from "@reduxjs/toolkit";
import clientesReducer from "./slices/clientesSlice";
import equipamentosReducer from "./slices/equipamentosSlice";
import ordensServicoReducer from "./slices/ordensServicoSlice";
import gastosReducer from "./slices/gastosSlice";

export const store = configureStore({
  reducer: {
    clientes: clientesReducer,
    equipamentos: equipamentosReducer,
    ordensServico: ordensServicoReducer,
    gastos: gastosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
