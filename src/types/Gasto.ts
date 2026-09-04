export type CategoriaGastos =
  | "material"
  | "combustivel"
  | "ferramenta"
  | "outos";

export interface Gasto {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  categoria: CategoriaGastos;
}

export type NovoGasto = Omit<Gasto, "id">;
