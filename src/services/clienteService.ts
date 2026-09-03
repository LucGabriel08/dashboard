import { api } from "./api";
import type { Cliente, NovoCliente } from "../types/Cliente";

export async function buscarClientes(): Promise<Cliente[]> {
  const resposta = await api.get<Cliente[]>("/clientes");
  return resposta.data;
}

export async function buscarClientePorId(id: number): Promise<Cliente> {
  const resposta = await api.get<Cliente>(`/clientes/${id}`);
  return resposta.data;
}

export async function criarCliente(cliente: NovoCliente): Promise<Cliente> {
  const resposta = await api.post<Cliente>("/clientes", cliente);
  return resposta.data;
}

export async function atualizarCliente(
  id: number,
  cliente: NovoCliente,
): Promise<Cliente> {
  const resposta = await api.put<Cliente>(`/clientes/${id}`, cliente);
  return resposta.data;
}

export async function excluirCliente(id: number): Promise<void> {
  await api.delete(`/clientes/${id}`);
}
