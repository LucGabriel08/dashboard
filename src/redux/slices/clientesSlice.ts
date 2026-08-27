import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Cliente, NovoCliente } from "../../types/Cliente";
import {
  buscarClientes,
  criarCliente,
  atualizarCliente,
  excluirCliente,
} from "../../services/clienteService";

interface ClientesState {
  lista: Cliente[];
  carregando: boolean;
  erro: string | null;
}

const estadoInicial: ClientesState = {
  lista: [],
  carregando: false,
  erro: null,
};

export const carregarClientes = createAsyncThunk(
  "clientes/carregar",
  async () => {
    return await buscarClientes();
  },
);

export const adicionarCliente = createAsyncThunk(
  "clientes/adicionar",
  async (novoCliente: NovoCliente) => {
    return await criarCliente(novoCliente);
  },
);

export const editarCliente = createAsyncThunk(
  "clientes/editar",
  async ({ id, dados }: { id: number; dados: NovoCliente }) => {
    return await atualizarCliente(id, dados);
  },
);

export const removerCliente = createAsyncThunk(
  "clientes/remover",
  async (id: number) => {
    await excluirCliente(id);
    return id;
  },
);

const clientesSlice = createSlice({
  name: "clientes",
  initialState: estadoInicial,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(carregarClientes.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(
        carregarClientes.fulfilled,
        (state, action: PayloadAction<Cliente[]>) => {
          state.carregando = false;
          state.lista = action.payload;
        },
      )
      .addCase(carregarClientes.rejected, (state) => {
        state.carregando = false;
        state.erro = "Erro ao carregar clientes";
      })
      .addCase(
        adicionarCliente.fulfilled,
        (state, action: PayloadAction<Cliente>) => {
          state.lista.push(action.payload);
        },
      )
      .addCase(
        editarCliente.fulfilled,
        (state, action: PayloadAction<Cliente>) => {
          const index = state.lista.findIndex(
            (c) => c.id === action.payload.id,
          );
          if (index !== -1) {
            state.lista[index] = action.payload;
          }
        },
      )
      .addCase(
        removerCliente.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.lista = state.lista.filter((c) => c.id !== action.payload);
        },
      );
  },
});

export default clientesSlice.reducer;
