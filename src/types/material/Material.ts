export interface Material {
  id: number;
  nome: string;
  unidade: string;
  precoUnitario: number;
}

export type NovoMaterial = Omit<Material, "id">;
