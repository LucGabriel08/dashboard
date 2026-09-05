import { useFormik } from "formik";
import * as yup from "yup";
import { useAppSelector } from "../../redux/hooks";
import type {
  NovoEquipamento,
  TipoEquipamento,
} from "../../types/equipamentos/Equipamento";
import * as S from "./EquipamentoForm.styles";
import { equipamentoValidationSchema } from "./equipamentoValidation";

interface EquipamentoFormProps {
  valoresIniciais?: NovoEquipamento;
  aoSalvar: (dados: NovoEquipamento) => void;
  aoCancelar: () => void;
}
const valoresVazios: NovoEquipamento = {
  clienteId: 0,
  tipo: "split",
  marca: "",
  modelo: "",
  capacidadeBTUs: 0,
  dataInstalacao: "",
};
export function EquipamentoForm({
  valoresIniciais,
  aoSalvar,
  aoCancelar,
}: EquipamentoFormProps) {
  const clientes = useAppSelector((state) => state.clientes.lista);
  const formik = useFormik<NovoEquipamento>({
    initialValues: { ...valoresVazios, ...valoresIniciais },
    validationSchema: equipamentoValidationSchema,
    onSubmit: (valores) => {
      aoSalvar(valores);
    },
  });
  return (
    <S.Form onSubmit={formik.handleSubmit}>
      <S.Campo>
        <label htmlFor="clienteId">Cliente</label>
        <select
          id="clienteId"
          name="clienteId"
          value={formik.values.clienteId}
          onChange={(e) =>
            formik.setFieldValue("clienteId", Number(e.target.value))
          }
          onBlur={formik.handleBlur}
        >
          <option value={0}>Selecione um cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>
        {formik.touched.clienteId && formik.errors.clienteId && (
          <S.Erro>{formik.errors.clienteId}</S.Erro>
        )}
      </S.Campo>
      <S.Campo>
        <label htmlFor="tipo">Tipo</label>
        <select
          id="tipo"
          name="tipo"
          value={formik.values.tipo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="split">Split</option>
          <option value="janela">Janela</option>
          <option value="central">Central</option>
        </select>
        {formik.touched.tipo && formik.errors.tipo && (
          <S.Erro>{formik.errors.tipo}</S.Erro>
        )}
      </S.Campo>
      <S.Campo>
        <label htmlFor="marca">Marca</label>
        <input
          id="marca"
          name="marca"
          type="text"
          value={formik.values.marca}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.marca && formik.errors.marca && (
          <S.Erro>{formik.errors.marca}</S.Erro>
        )}
      </S.Campo>
      <S.Campo>
        <label htmlFor="modelo">Modelo</label>
        <input
          id="modelo"
          name="modelo"
          type="text"
          value={formik.values.modelo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.modelo && formik.errors.modelo && (
          <S.Erro>{formik.errors.modelo}</S.Erro>
        )}
      </S.Campo>
      <S.Campo>
        <label htmlFor="capacidadeBTUs">Capacidade (BTUs)</label>
        <select
          id="capacidadeBTUs"
          name="capacidadeBTUs"
          value={formik.values.capacidadeBTUs}
          onChange={(e) =>
            formik.setFieldValue("capacidadeBTUs", Number(e.target.value))
          }
          onBlur={formik.handleBlur}
        >
          <option value={0}>Selecione a capacidade</option>
          <option value={7000}>7.000 BTUs</option>
          <option value={9000}>9.000 BTUs</option>
          <option value={12000}>12.000 BTUs</option>
          <option value={18000}>18.000 BTUs</option>
          <option value={22000}>22.000 BTUs</option>
          <option value={24000}>24.000 BTUs</option>
          <option value={30000}>30.000 BTUs</option>
          <option value={36000}>36.000 BTUs</option>
          <option value={48000}>48.000 BTUs</option>
          <option value={60000}>60.000 BTUs</option>
        </select>
        {formik.touched.capacidadeBTUs && formik.errors.capacidadeBTUs && (
          <S.Erro>{formik.errors.capacidadeBTUs}</S.Erro>
        )}
      </S.Campo>
      <S.Campo>
        <label htmlFor="dataInstalacao">Data de instalação</label>
        <input
          id="dataInstalacao"
          name="dataInstalacao"
          type="date"
          value={formik.values.dataInstalacao}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.dataInstalacao && formik.errors.dataInstalacao && (
          <S.Erro>{formik.errors.dataInstalacao}</S.Erro>
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
