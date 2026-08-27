export type TipoEquipamento = "split" | "janela" | "central";

export interface Equipamento {
  id: number;
  clienteId: number;
  tipo: TipoEquipamento;
  marca: string;
  modelo: string;
  capacidadeBTUs: number;
  dataInstalacao: string;
}

export type NovoEquipamento = Omit<Equipamento, "id">;
