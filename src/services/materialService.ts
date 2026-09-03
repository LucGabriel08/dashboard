import { api } from "./api";
import type { Material, NovoMaterial } from "../types/material/Material";

export async function buscarMateriais(): Promise<Material[]> {
  const resposta = await api.get<Material[]>("/materiais");
  return resposta.data;
}

export async function criarMaterial(material: NovoMaterial): Promise<Material> {
  const resposta = await api.post<Material>("/materiais", material);
  return resposta.data;
}

export async function atualizarMaterial(
  id: number,
  material: NovoMaterial,
): Promise<Material> {
  const resposta = await api.put<Material>(`/materiais/${id}`, material);
  return resposta.data;
}

export async function excluirMaterial(id: number): Promise<void> {
  await api.delete(`/materiais/${id}`);
}
