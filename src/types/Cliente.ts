export interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  endereco: string;
  email?: string;
}

export type NovoCliente = Omit<Cliente, "id">;
