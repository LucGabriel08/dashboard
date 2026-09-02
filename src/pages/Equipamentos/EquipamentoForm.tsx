import { useFormik } from "formik";
import * as yup from "yup";
import { useAppSelector } from "../../redux/hooks";
import type {
  NovoEquipamento,
  TipoEquipamento,
} from "../../types/equipamentos/Equipamento";
import * as S from "./EquipamentoForm.styles";

const validationSchema = yup.object({
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
    .positive("Precisa ser um número positivo"),
  dataInstalacao: yup.string().required("A data de instalação é obrigatória"),
});
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
    initialValues: valoresIniciais ?? valoresVazios,
    validationSchema,
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
          onChange={formik.handleChange}
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
        <input
          id="capacidadeBTUs"
          name="capacidadeBTUs"
          type="number"
          value={formik.values.capacidadeBTUs}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
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
