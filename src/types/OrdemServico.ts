export type TipoServico = "manutencao" | "instalacao";
export type StatusServico = "agendado" | "em_andamento" | "concluido";

export interface MaterialUsado {
  materialId: number;
  nome: string;
  quantidade: number;
  custoUnitario: number;
}

export interface OrdemServico {
  id: number;
  clienteId: number;
  equipamentoId: number;
  tipo: TipoServico;
  data: string;
  status: StatusServico;
  valorCobrado: number;
  observacoes: string;
  materiaisUsados: MaterialUsado[];
}

export type NovaOrdemServico = Omit<OrdemServico, "id">;
