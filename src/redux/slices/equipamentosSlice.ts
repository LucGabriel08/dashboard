import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  Equipamento,
  NovoEquipamento,
} from "../../types/equipamentos/Equipamento";
import {
  buscarEquipamentos,
  criarEquipamento,
  atualizarEquipamento,
  excluirEquipamento,
} from "../../services/equipamentoService";

interface EquipamentosState {
  lista: Equipamento[];
  carregando: boolean;
  erro: string | null;
}

const estadoInicial: EquipamentosState = {
  lista: [],
  carregando: false,
  erro: null,
};

export const carregarEquipamentos = createAsyncThunk(
  "equipamento/carregar",
  async () => {
    return await buscarEquipamentos();
  },
);

export const adicionarEquipamento = createAsyncThunk(
  "equipamentos/adicionar",
  async (novoEquipamento: NovoEquipamento) => {
    return await criarEquipamento(novoEquipamento);
  },
);

export const editarEquipamento = createAsyncThunk(
  "equipamentos/editar",
  async ({ id, dados }: { id: number; dados: NovoEquipamento }) => {
    return await atualizarEquipamento(id, dados);
  },
);

export const removerEquipamento = createAsyncThunk(
  "equipamentos/remover",
  async (id: number) => {
    await excluirEquipamento(id);
    return id;
  },
);

const equipamentosSlice = createSlice({
  name: "equipamentos",
  initialState: estadoInicial,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(carregarEquipamentos.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(
        carregarEquipamentos.fulfilled,
        (state, action: PayloadAction<Equipamento[]>) => {
          state.carregando = false;
          state.lista = action.payload;
        },
      )
      .addCase(carregarEquipamentos.rejected, (state) => {
        state.carregando = false;
        state.erro = "Erro ao carregar equipamentos";
      })
      .addCase(
        adicionarEquipamento.fulfilled,
        (state, action: PayloadAction<Equipamento>) => {
          state.lista.push(action.payload);
        },
      )
      .addCase(
        editarEquipamento.fulfilled,
        (state, action: PayloadAction<Equipamento>) => {
          const index = state.lista.findIndex(
            (e: { id: number }) => e.id === action.payload.id,
          );
          if (index !== -1) {
            state.lista[index] = action.payload;
          }
        },
      )
      .addCase(
        removerEquipamento.fulfilled,
        (state: { lista: any[] }, action: PayloadAction<number>) => {
          state.lista = state.lista.filter((e) => e.id !== action.payload);
        },
      );
  },
});

export default equipamentosSlice.reducer;
