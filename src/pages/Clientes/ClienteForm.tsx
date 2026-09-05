import { useFormik } from "formik";
import type { NovoCliente } from "../../types/Cliente";
import { clienteValidationSchema } from "./clienteValidation";
import * as S from "./ClienteForm.styles";
import { mascararTelefone } from "../../utils/mascaras";

interface ClienteFormProps {
  valoresIniciais?: NovoCliente;
  aoSalvar: (dados: NovoCliente) => void;
  aoCancelar: () => void;
}

const valoresVazios: NovoCliente = {
  nome: "",
  telefone: "",
  endereco: "",
  email: "",
};

export function ClienteForm({
  valoresIniciais,
  aoSalvar,
  aoCancelar,
}: ClienteFormProps) {
  const formik = useFormik<NovoCliente>({
    initialValues: valoresIniciais ?? valoresVazios,
    validationSchema: clienteValidationSchema,
    onSubmit: (valores) => {
      aoSalvar(valores);
    },
  });

  return (
    <S.Form onSubmit={formik.handleSubmit}>
      <S.Campo>
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          type="text"
          value={formik.values.nome}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.nome && formik.errors.nome && (
          <S.Erro>{formik.errors.nome}</S.Erro>
        )}
      </S.Campo>

      <S.Campo>
        <label htmlFor="telefone">Telefone</label>
        <input
          id="telefone"
          name="telefone"
          type="text"
          value={formik.values.telefone}
          onChange={(e) => {
            const valorFormatado = mascararTelefone(e.target.value);
            formik.setFieldValue("telefone", valorFormatado);
          }}
          onBlur={formik.handleBlur}
          maxLength={15}
        />
        {formik.touched.telefone && formik.errors.telefone && (
          <S.Erro>{formik.errors.telefone}</S.Erro>
        )}
      </S.Campo>

      <S.Campo>
        <label htmlFor="endereco">Endereço</label>
        <input
          id="endereco"
          name="endereco"
          type="text"
          value={formik.values.endereco}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.endereco && formik.errors.endereco && (
          <S.Erro>{formik.errors.endereco}</S.Erro>
        )}
      </S.Campo>

      <S.Campo>
        <label htmlFor="email">E-mail (opcional)</label>
        <input
          id="email"
          name="email"
          type="text"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <S.Erro>{formik.errors.email}</S.Erro>
        )}
      </S.Campo>

      <S.Botoes>
        <S.BotaoCancelar type="button" onClick={aoCancelar}>
          Cancelar
        </S.BotaoCancelar>
        <S.BotaoSalvar type="submit">Salvar</S.BotaoSalvar>
      </S.Botoes>
    </S.Form>
  );
}
