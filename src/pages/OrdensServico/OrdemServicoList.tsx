import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  carregarOrdensServico,
  adicionarOrdemServico,
  editarOrdemServico,
  removerOrdemServico,
} from "../../redux/slices/ordensServicoSlice";
import { carregarClientes } from "../../redux/slices/clientesSlice";
import { carregarEquipamentos } from "../../redux/slices/equipamentosSlice";
import { carregarMateriais } from "../../redux/slices/materiaisSlice";
import type { OrdemServico, NovaOrdemServico } from "../../types/OrdemServico";
import { OrdemServicoForm } from "./OrdemServicoForm";
import * as S from "./OrdemServicoList.styles";

const statusLabel: Record<string, string> = {
  agendado: "Agendado",
  em_andamento: "Em andamento",
  concluido: "Concluído",
};

const tipoLabel: Record<string, string> = {
  manutencao: "Manutenção",
  instalacao: "Instalação",
};

export function OrdemServicoList() {
  const dispatch = useAppDispatch();
  const { lista, carregando, erro } = useAppSelector(
    (state) => state.ordensServico,
  );
  const clientes = useAppSelector((state) => state.clientes.lista);
  const equipamentos = useAppSelector((state) => state.equipamentos.lista);

  const [formularioAberto, setFormularioAberto] = useState(false);
  const [ordemEmEdicao, setOrdemEmEdicao] = useState<OrdemServico | null>(null);

  useEffect(() => {
    dispatch(carregarOrdensServico());
    dispatch(carregarClientes());
    dispatch(carregarEquipamentos());
    dispatch(carregarMateriais());
  }, [dispatch]);
  function nomeDoCliente(clienteId: number): string {
    const cliente = clientes.find((c) => c.id === clienteId);
    return cliente ? cliente.nome : "Cliente não encontrado";
  }
  function nomeDoEquipamento(equipamentoId: number): string {
    const equipamento = equipamentos.find((e) => e.id === equipamentoId);
    return equipamento
      ? `${equipamento.tipo} - ${equipamento.marca} ${equipamento.modelo}`
      : "Equipamento não encontrado";
  }
  function calcularLucro(ordem: OrdemServico): number {
    const custoMateriais = ordem.materiaisUsados.reduce(
      (total, item) => total + item.quantidade * item.custoUnitario,
      0,
    );
    return ordem.valorCobrado - custoMateriais;
  }
  function abrirFormularioNovo() {
    setOrdemEmEdicao(null);
    setFormularioAberto(true);
  }
  function abrirFormularioEdicao(ordem: OrdemServico) {
    setOrdemEmEdicao(ordem);
    setFormularioAberto(true);
  }
  function fecharFormulario() {
    setFormularioAberto(false);
    setOrdemEmEdicao(null);
  }
  function salvarOrdem(dados: NovaOrdemServico) {
    if (ordemEmEdicao) {
      dispatch(editarOrdemServico({ id: ordemEmEdicao.id, dados }));
    } else {
      dispatch(adicionarOrdemServico(dados));
    }
    fecharFormulario();
  }
  function excluirOrdemHandler(id: number) {
    const confirmou = window.confirm(
      "Tem certeza que deseja excluir esta ordem de serviço?",
    );
    if (confirmou) {
      dispatch(removerOrdemServico(id));
    }
  }
  if (carregando) {
    return <S.Mensagem>Carregando ordens de serviço...</S.Mensagem>;
  }
  if (erro) {
    return <S.Mensagem>{erro}</S.Mensagem>;
  }
  if (formularioAberto) {
    return (
      <S.Container>
        <S.Titulo>
          {ordemEmEdicao ? "Editar ordem de serviço" : "Nova ordem de serviço"}
        </S.Titulo>
        <OrdemServicoForm
          valoresIniciais={ordemEmEdicao ?? undefined}
          aoSalvar={salvarOrdem}
          aoCancelar={fecharFormulario}
        />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Cabecalho>
        <S.Titulo>Ordens de Serviço</S.Titulo>
        <S.BotaoNovo onClick={abrirFormularioNovo}>
          + Nova ordem de serviço
        </S.BotaoNovo>
      </S.Cabecalho>

      {lista.length === 0 ? (
        <S.Mensagem>Nenhuma ordem de serviço cadastrada ainda.</S.Mensagem>
      ) : (
        <S.Tabela>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Equipamento</th>
              <th>Tipo</th>
              <th>Data</th>
              <th>Status</th>
              <th>Valor</th>
              <th>Lucro</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lista.map((ordem) => (
              <tr key={ordem.id}>
                <td>{nomeDoCliente(ordem.clienteId)}</td>
                <td>{nomeDoEquipamento(ordem.equipamentoId)}</td>
                <td>{tipoLabel[ordem.tipo]}</td>
                <td>{ordem.data}</td>
                <td>{statusLabel[ordem.status]}</td>
                <td>R$ {ordem.valorCobrado}</td>
                <td>R$ {calcularLucro(ordem)}</td>
                <td>
                  <S.BotaoAcao onClick={() => abrirFormularioEdicao(ordem)}>
                    Editar
                  </S.BotaoAcao>
                  <S.BotaoAcao
                    onClick={() => excluirOrdemHandler(ordem.id)}
                    $perigo
                  >
                    Excluir
                  </S.BotaoAcao>
                </td>
              </tr>
            ))}
          </tbody>
        </S.Tabela>
      )}
    </S.Container>
  );
}
