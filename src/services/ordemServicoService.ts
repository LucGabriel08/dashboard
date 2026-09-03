import { api } from "./api";
import type { OrdemServico, NovaOrdemServico } from "../types/OrdemServico";

export async function buscarOrdensServicos(): Promise<OrdemServico[]> {
  const resposta = await api.get<OrdemServico[]>("/ordensServico");
  return resposta.data;
}

export async function criarOrdemServico(
  OrdemServico: NovaOrdemServico,
): Promise<OrdemServico> {
  const resposta = await api.post<OrdemServico>("/ordensServico");
  return resposta.data;
}

export async function atualizarOrdemServico(
  id: number,
  OrdemServico: NovaOrdemServico,
): Promise<OrdemServico> {
  const resposta = await api.put<OrdemServico>(
    `/ordensServico/${id}`,
    OrdemServico,
  );
  return resposta.data;
}

export async function excluirOrdemServico(id: number): Promise<void> {
  await api.delete(`/ordensServico/${id}`);
}
