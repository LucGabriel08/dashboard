import { useFormik } from "formik";
import { useAppSelector } from "../../redux/hooks";
import type { NovaOrdemServico } from "../../types/OrdemServico";
import { ordemServicoValidationSchema } from "./ordemServicoValidation";
import * as S from "./OrdemServicoForm.styles";

interface OrdemServicoFormProps {
  valoresIniciais?: NovaOrdemServico;
  aoSalvar: (dados: NovaOrdemServico) => void;
  aoCancelar: () => void;
}

const valoresVazios: NovaOrdemServico = {
  clienteId: 0,
  equipamentoId: 0,
  tipo: "manutencao",
  data: "",
  status: "agendado",
  valorCobrado: 0,
  observacoes: "",
};

export function OrdemServicoForm({
  valoresIniciais,
  aoSalvar,
  aoCancelar,
}: OrdemServicoFormProps) {
  const clientes = useAppSelector((state) => state.clientes.lista);
  const equipamentos = useAppSelector((state) => state.equipamentos.lista);

  const formik = useFormik<NovaOrdemServico>({
    initialValues: { ...valoresVazios, ...valoresIniciais },
    validationSchema: ordemServicoValidationSchema,
    onSubmit: (valores) => {
      aoSalvar(valores);
    },
  });

  const equipamentosDoCliente = equipamentos.filter(
    (equipamento) => equipamento.clienteId === formik.values.clienteId,
  );

  return (
    <S.Form onSubmit={formik.handleSubmit}>
      <S.Campo>
        <label htmlFor="clienteId">Cliente</label>
        <select
          id="clienteId"
          name="clienteId"
          value={formik.values.clienteId}
          onChange={(e) => {
            formik.setFieldValue("clienteId", Number(e.target.value));
            formik.setFieldValue("equipamentoId", 0);
          }}
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
        <label htmlFor="equipamentoId">Equipamento</label>
        <select
          id="equipamentoId"
          name="equipamentoId"
          value={formik.values.equipamentoId}
          onChange={(e) =>
            formik.setFieldValue("equipamentoId", Number(e.target.value))
          }
          onBlur={formik.handleBlur}
          disabled={formik.values.clienteId === 0}
        >
          <option value={0}>
            {formik.values.clienteId === 0
              ? "Selecione um cliente primeiro"
              : "Selecione um equipamento"}
          </option>
          {equipamentosDoCliente.map((equipamento) => (
            <option key={equipamento.id} value={equipamento.id}>
              {equipamento.tipo} - {equipamento.marca} {equipamento.modelo}
            </option>
          ))}
        </select>
        {formik.touched.equipamentoId && formik.errors.equipamentoId && (
          <S.Erro>{formik.errors.equipamentoId}</S.Erro>
        )}
      </S.Campo>

      <S.Campo>
        <label htmlFor="tipo">Tipo de serviço</label>
        <select
          id="tipo"
          name="tipo"
          value={formik.values.tipo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="manutencao">Manutenção</option>
          <option value="instalacao">Instalação</option>
        </select>
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
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="agendado">Agendado</option>
          <option value="em_andamento">Em andamento</option>
          <option value="concluido">Concluído</option>
        </select>
      </S.Campo>

      <S.Campo>
        <label htmlFor="valorCobrado">Valor cobrado (R$)</label>
        <input
          id="valorCobrado"
          name="valorCobrado"
          type="number"
          value={formik.values.valorCobrado}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.valorCobrado && formik.errors.valorCobrado && (
          <S.Erro>{formik.errors.valorCobrado}</S.Erro>
        )}
      </S.Campo>

      <S.Campo>
        <label htmlFor="observacoes">Observações</label>
        <textarea
          id="observacoes"
          name="observacoes"
          value={formik.values.observacoes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
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
