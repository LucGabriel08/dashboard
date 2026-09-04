export type TipoServico = "manutencao" | "instalacao";
export type StatusServico = "agendado" | "em_andamento" | "concluido";

export interface OrdemServico {
  id: number;
  clienteId: number;
  equipamentoId: number;
  tipo: TipoServico;
  data: string;
  status: StatusServico;
  valorCobrado: number;
  observacoes: string;
}

export type NovaOrdemServico = Omit<OrdemServico, "id">;
