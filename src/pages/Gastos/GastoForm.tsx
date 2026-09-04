import { useFormik } from "formik";
import type { NovoGasto } from "../../types/Gasto";
import { gastoValidationSchema } from "./gastoValidation";
import * as S from "./GastoForm.styles";

interface GastoFormProps {
  valoresIniciais?: NovoGasto;
  aoSalvar: (dados: NovoGasto) => void;
  aoCancelar: () => void;
}

const valoresVazios: NovoGasto = {
  descricao: "",
  valor: 0,
  data: "",
  categoria: "material",
};

export function GastoForm({
  valoresIniciais,
  aoSalvar,
  aoCancelar,
}: GastoFormProps) {
  const formik = useFormik<NovoGasto>({
    initialValues: { ...valoresVazios, ...valoresIniciais },
    validationSchema: gastoValidationSchema,
    onSubmit: (valores) => {
      aoSalvar(valores);
    },
  });

  return (
    <S.Form onSubmit={formik.handleSubmit}>
      <S.Campo>
        <label htmlFor="descricao">Descrição</label>
        <input
          id="descricao"
          name="descricao"
          type="text"
          value={formik.values.descricao}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.descricao && formik.errors.descricao && (
          <S.Erro>{formik.errors.descricao}</S.Erro>
        )}
      </S.Campo>

      <S.Campo>
        <label htmlFor="valor">Valor (R$)</label>
        <input
          id="valor"
          name="valor"
          type="number"
          step="0.01"
          value={formik.values.valor}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.valor && formik.errors.valor && (
          <S.Erro>{formik.errors.valor}</S.Erro>
        )}
      </S.Campo>

      <S.Campo>
        <label htmlFor="data">Data</label>
        <input
          id="data"
          name="data"
          type="date"
          value={formik.values.data}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.data && formik.errors.data && (
          <S.Erro>{formik.errors.data}</S.Erro>
        )}
      </S.Campo>

      <S.Campo>
        <label htmlFor="categoria">Categoria</label>
        <select
          id="categoria"
          name="categoria"
          value={formik.values.categoria}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="material">Material</option>
          <option value="combustivel">Combustível</option>
          <option value="ferramenta">Ferramenta</option>
          <option value="outro">Outro</option>
        </select>
        {formik.touched.categoria && formik.errors.categoria && (
          <S.Erro>{formik.errors.categoria}</S.Erro>
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
