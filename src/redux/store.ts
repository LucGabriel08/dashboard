import { configureStore } from "@reduxjs/toolkit";
import clientesReducer from "./slices/clientesSlice";
import equipamentosReducer from "./slices/equipamentosSlice";
import ordensServicoReducer from "./slices/ordensServicoSlice";
import materiaisReducer from "./slices/materiaisSlice";

export const store = configureStore({
  reducer: {
    clientes: clientesReducer,
    equipamentos: equipamentosReducer,
    ordensServico: ordensServicoReducer,
    materiais: materiaisReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
