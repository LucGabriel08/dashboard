import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Material, NovoMaterial } from "../../types/material/Material";
import {
  buscarMateriais,
  criarMaterial,
  atualizarMaterial,
  excluirMaterial,
} from "../../services/materialService";

interface MateriaisState {
  lista: Material[];
  carregando: boolean;
  erro: string | null;
}

const estadoInicial: MateriaisState = {
  lista: [],
  carregando: false,
  erro: null,
};

export const carregarMateriais = createAsyncThunk(
  "materiais/carregar",
  async () => {
    return await buscarMateriais();
  },
);

export const adicionarMaterial = createAsyncThunk(
  "materiais/adicionar",
  async (novoMaterial: NovoMaterial) => {
    return await criarMaterial(novoMaterial);
  },
);

export const editarMaterial = createAsyncThunk(
  "materiais/editar",
  async ({ id, dados }: { id: number; dados: NovoMaterial }) => {
    return await atualizarMaterial(id, dados);
  },
);

export const removerMaterial = createAsyncThunk(
  "materiais/remover",
  async (id: number) => {
    await excluirMaterial(id);
    return id;
  },
);

const materiaisSlice = createSlice({
  name: "materiais",
  initialState: estadoInicial,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(carregarMateriais.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(
        carregarMateriais.fulfilled,
        (state, action: PayloadAction<Material[]>) => {
          state.carregando = false;
          state.lista = action.payload;
        },
      )
      .addCase(carregarMateriais.rejected, (state) => {
        state.carregando = false;
        state.erro = "Erro ao carregar materiais";
      })
      .addCase(
        adicionarMaterial.fulfilled,
        (state, action: PayloadAction<Material>) => {
          state.lista.push(action.payload);
        },
      )
      .addCase(
        editarMaterial.fulfilled,
        (state, action: PayloadAction<Material>) => {
          const index = state.lista.findIndex(
            (m) => m.id === action.payload.id,
          );
          if (index !== -1) {
            state.lista[index] = action.payload;
          }
        },
      )
      .addCase(
        removerMaterial.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.lista = state.lista.filter((m) => m.id !== action.payload);
        },
      );
  },
});

export default materiaisSlice.reducer;
