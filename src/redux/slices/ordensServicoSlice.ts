import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { OrdemServico, NovaOrdemServico } from "../../types/OrdemServico";
import {
  buscarOrdensServicos,
  criarOrdemServico,
  atualizarOrdemServico,
  excluirOrdemServico,
} from "../../services/ordemServicoService";

interface OrdensServicoState {
  lista: OrdemServico[];
  carregando: boolean;
  erro: string | null;
}

const estadoInicial: OrdensServicoState = {
  lista: [],
  carregando: false,
  erro: null,
};

export const carregarOrdensServico = createAsyncThunk(
  "ordensServico/carregar",
  async () => {
    return await buscarOrdensServicos();
  },
);

export const adicionarOrdemServico = createAsyncThunk(
  "ordensServico/adicionar",
  async (novaOrdemServico: NovaOrdemServico) => {
    return await criarOrdemServico(novaOrdemServico);
  },
);

export const editarOrdemServico = createAsyncThunk(
  "ordensServico/editar",
  async ({ id, dados }: { id: number; dados: NovaOrdemServico }) => {
    return await atualizarOrdemServico(id, dados);
  },
);

export const removerOrdemServico = createAsyncThunk(
  "ordensServico/remover",
  async (id: number) => {
    await excluirOrdemServico(id);
    return id;
  },
);

const ordensServicoSlice = createSlice({
  name: "ordensServico",
  initialState: estadoInicial,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(carregarOrdensServico.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(
        carregarOrdensServico.fulfilled,
        (state, action: PayloadAction<OrdemServico[]>) => {
          state.carregando = false;
          state.lista = action.payload;
        },
      )
      .addCase(carregarOrdensServico.rejected, (state) => {
        state.carregando = false;
        state.erro = "Erro ao carregar ordens de serviço";
      })
      .addCase(
        adicionarOrdemServico.fulfilled,
        (state, action: PayloadAction<OrdemServico>) => {
          state.lista.push(action.payload);
        },
      )
      .addCase(
        editarOrdemServico.fulfilled,
        (state, action: PayloadAction<OrdemServico>) => {
          const index = state.lista.findIndex(
            (os) => os.id === action.payload.id,
          );
          if (index !== -1) {
            state.lista[index] = action.payload;
          }
        },
      )
      .addCase(
        removerOrdemServico.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.lista = state.lista.filter((os) => os.id !== action.payload);
        },
      );
  },
});

export default ordensServicoSlice.reducer;
