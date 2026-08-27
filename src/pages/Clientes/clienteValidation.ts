import * as yup from "yup";

export const clienteValidationSchema = yup.object({
  nome: yup
    .string()
    .required("O nome é obrigatório")
    .min(3, "O nome precisa ter pelo menos 3 letras"),
  telefone: yup.string().required("O telefone é obrigatório"),
  endereco: yup.string().required("O endereço é obrigatório"),
  email: yup.string().email("Digite um e-mail válido").notRequired(),
});
