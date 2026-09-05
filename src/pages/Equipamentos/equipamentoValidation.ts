import * as yup from "yup";

export const equipamentoValidationSchema = yup.object({
  clienteId: yup
    .number()
    .required("Selecione um cliente")
    .min(1, "Selecione um cliente"),
  tipo: yup
    .string()
    .oneOf(["split", "janela", "central"], "Selecione um tipo válido")
    .required("Selecione o tipo"),
  marca: yup.string().required("A marca é obrigatória"),
  modelo: yup.string().required("O modelo é obrigatório"),
  capacidadeBTUs: yup
    .number()
    .required("A capacidade é obrigatória")
    .min(1, "Selecione uma capacidade"),
  dataInstalacao: yup.string().required("A data de instalação é obrigatória"),
});
