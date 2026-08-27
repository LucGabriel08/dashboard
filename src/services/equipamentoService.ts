import axios from "axios";
import type {
  Equipamento,
  NovoEquipamento,
} from "../types/equipamentos/Equipamento";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export async function buscarEquipamentos(): Promise<Equipamento[]> {
  const resposta = await api.get<Equipamento[]>("/equipamentos");
  return resposta.data;
}

export async function buscarEquipamentosPorCliente(
  clienteId: number,
): Promise<Equipamento[]> {
  const resposta = await api.get<Equipamento[]>("/equipamentos", {
    params: { clienteId },
  });
  return resposta.data;
}

export async function criarEquipamento(
  equipamento: NovoEquipamento,
): Promise<Equipamento> {
  const resposta = await api.post<Equipamento>("/equipamentos", equipamento);
  return resposta.data;
}

export async function atualizarEquipamento(
  id: number,
  equipamento: NovoEquipamento,
): Promise<Equipamento> {
  const resposta = await api.put<Equipamento>(
    `/equipamentos/${id}`,
    equipamento,
  );
  return resposta.data;
}

export async function excluirEquipamento(id: number): Promise<void> {
  await api.delete(`/equipamentos/${id}`);
}
