import * as yup from "yup";

export const ordemServicoValidationSchema = yup.object({
  clienteId: yup.number().required().min(1, "Selecione um cliente"),
  equipamentoId: yup.number().required().min(1, "Selecione um equipamento"),
  tipo: yup
    .string()
    .oneOf(["manutencao", "instalacao"])
    .required("Selecione o tipo"),
  data: yup.string().required("A data é obrigatória"),
  status: yup
    .string()
    .oneOf(["agendado", "em_andamento", "concluido"])
    .required("Selecione o status"),
  valorCobrado: yup
    .number()
    .required("O valor é obrigatório")
    .min(0, "O valor não pode ser negativo"),
  observacoes: yup.string().notRequired(),
});
