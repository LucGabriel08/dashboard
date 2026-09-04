import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Gasto, NovoGasto } from "../../types/Gasto";
import {
  BuscarGastos,
  CriarGastos,
  atualizarGasto,
  excluirGasto,
} from "../../services/gastoService";

interface GastosState {
  lista: Gasto[];
  carregando: boolean;
  erro: string | null;
}

const estadoInicial: GastosState = {
  lista: [],
  carregando: false,
  erro: null,
};

export const carregarGastos = createAsyncThunk("gastos/carregar", async () => {
  return await BuscarGastos();
});

export const adicionarGasto = createAsyncThunk(
  "gastos/adicionar",
  async (novoGasto: NovoGasto) => {
    return await CriarGastos(novoGasto);
  },
);

export const editarGasto = createAsyncThunk(
  "gastos/editar",
  async ({ id, dados }: { id: number; dados: NovoGasto }) => {
    return await atualizarGasto(id, dados);
  },
);

export const removerGasto = createAsyncThunk(
  "gastos/remover",
  async (id: number) => {
    await excluirGasto(id);
    return id;
  },
);

const gastosSlice = createSlice({
  name: "gastos",
  initialState: estadoInicial,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(carregarGastos.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(
        carregarGastos.fulfilled,
        (state, action: PayloadAction<Gasto[]>) => {
          state.carregando = false;
          state.lista = action.payload;
        },
      )
      .addCase(carregarGastos.rejected, (state) => {
        state.carregando = false;
        state.erro = "Erro ao carregar gastos";
      })
      .addCase(
        adicionarGasto.fulfilled,
        (state, action: PayloadAction<Gasto>) => {
          state.lista.push(action.payload);
        },
      )
      .addCase(editarGasto.fulfilled, (state, action: PayloadAction<Gasto>) => {
        const index = state.lista.findIndex((g) => g.id === action.payload.id);
        if (index !== -1) {
          state.lista[index] = action.payload;
        }
      })
      .addCase(
        removerGasto.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.lista = state.lista.filter((g) => g.id !== action.payload);
        },
      );
  },
});

export default gastosSlice.reducer;
