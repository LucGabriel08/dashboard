import { api } from "./api";
import type { Gasto, NovoGasto } from "../types/Gasto";

export async function BuscarGastos(): Promise<Gasto[]> {
  const resposta = await api.get<Gasto[]>("/gastos");
  return resposta.data;
}

export async function CriarGastos(gasto: NovoGasto): Promise<Gasto> {
  const resposta = await api.post<Gasto>("/gastos");
  return resposta.data;
}

export async function atualizarGasto(
  id: number,
  gasto: NovoGasto,
): Promise<Gasto> {
  const resposta = await api.put<Gasto>(`/gastos/${id}`, gasto);
  return resposta.data;
}

export async function excluirGasto(id: number): Promise<void> {
  await api.delete(`/gastos/${id}`);
}
