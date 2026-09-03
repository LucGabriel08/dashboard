import { useState } from "react";
import { useFormik } from "formik";
import { useAppSelector } from "../../redux/hooks";
import type { NovaOrdemServico, MaterialUsado } from "../../types/OrdemServico";
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
  materiaisUsados: [],
};

export function OrdemServicoForm({
  valoresIniciais,
  aoSalvar,
  aoCancelar,
}: OrdemServicoFormProps) {
  const clientes = useAppSelector((state) => state.clientes.lista);
  const equipamentos = useAppSelector((state) => state.equipamentos.lista);
  const materiaisCatalogo = useAppSelector((state) => state.materiais.lista);

  const [materiaisUsados, setMateriaisUsados] = useState<MaterialUsado[]>(
    valoresIniciais?.materiaisUsados ?? [],
  );
  const [materialSelecionadoId, setMaterialSelecionadoId] = useState(0);
  const [quantidadeMaterial, setQuantidadeMaterial] = useState(1);

  const formik = useFormik<NovaOrdemServico>({
    initialValues: valoresIniciais ?? valoresVazios,
    validationSchema: ordemServicoValidationSchema,
    onSubmit: (valores) => {
      aoSalvar({ ...valores, materiaisUsados });
    },
  });

  const equipamentosDoCliente = equipamentos.filter(
    (equipamento) => equipamento.clienteId === formik.values.clienteId,
  );

  function adicionarMaterial() {
    if (materialSelecionadoId === 0 || quantidadeMaterial <= 0) {
      return;
    }

    const material = materiaisCatalogo.find(
      (m) => m.id === materialSelecionadoId,
    );
    if (!material) {
      return;
    }

    const novoItem: MaterialUsado = {
      materialId: material.id,
      nome: material.nome,
      quantidade: quantidadeMaterial,
      custoUnitario: material.precoUnitario,
    };

    setMateriaisUsados([...materiaisUsados, novoItem]);
    setMaterialSelecionadoId(0);
    setQuantidadeMaterial(1);
  }

  function removerMaterial(index: number) {
    setMateriaisUsados(materiaisUsados.filter((_, i) => i !== index));
  }

  const custoTotalMateriais = materiaisUsados.reduce(
    (total, item) => total + item.quantidade * item.custoUnitario,
    0,
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

      <S.SecaoMateriais>
        <S.SubTitulo>Materiais usados</S.SubTitulo>

        <S.LinhaAdicionarMaterial>
          <select
            value={materialSelecionadoId}
            onChange={(e) => setMaterialSelecionadoId(Number(e.target.value))}
          >
            <option value={0}>Selecione um material</option>
            {materiaisCatalogo.map((material) => (
              <option key={material.id} value={material.id}>
                {material.nome} (R$ {material.precoUnitario})
              </option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            value={quantidadeMaterial}
            onChange={(e) => setQuantidadeMaterial(Number(e.target.value))}
          />
          <S.BotaoAdicionarMaterial type="button" onClick={adicionarMaterial}>
            Adicionar
          </S.BotaoAdicionarMaterial>
        </S.LinhaAdicionarMaterial>

        {materiaisUsados.length > 0 && (
          <S.ListaMateriais>
            {materiaisUsados.map((item, index) => (
              <S.ItemMaterial key={index}>
                <span>
                  {item.nome} — {item.quantidade}x R$ {item.custoUnitario} = R${" "}
                  {item.quantidade * item.custoUnitario}
                </span>
                <button type="button" onClick={() => removerMaterial(index)}>
                  Remover
                </button>
              </S.ItemMaterial>
            ))}
          </S.ListaMateriais>
        )}

        <S.CustoTotal>
          Custo total de materiais: R$ {custoTotalMateriais}
        </S.CustoTotal>
      </S.SecaoMateriais>

      <S.Botoes>
        <S.BotaoCancelar type="button" onClick={aoCancelar}>
          Cancelar
        </S.BotaoCancelar>
        <S.BotaoSalvar type="submit">Salvar</S.BotaoSalvar>
      </S.Botoes>
    </S.Form>
  );
}
