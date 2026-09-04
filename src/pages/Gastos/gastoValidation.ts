import * as yup from "yup";

export const gastoValidationSchema = yup.object({
  descricao: yup.string().required("A descrição é obrigatória"),
  valor: yup
    .number()
    .required("O valor é obrigatório")
    .positive("O valor precisa ser maior que zero"),
  data: yup.string().required("A data é obrigatória"),
  categoria: yup
    .string()
    .oneOf(
      ["material", "combustivel", "ferramenta", "outro"],
      "Selecione uma categoria válida",
    )
    .required("Selecione a categoria"),
});
