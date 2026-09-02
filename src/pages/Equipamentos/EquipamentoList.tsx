import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  carregarEquipamentos,
  adicionarEquipamento,
  editarEquipamento,
  removerEquipamento,
} from "../../redux/slices/equipamentosSlice";
import { carregarClientes } from "../../redux/slices/clientesSlice";
import type {
  Equipamento,
  NovoEquipamento,
} from "../../types/equipamentos/Equipamento";
import { EquipamentoForm } from "./EquipamentoForm";
import * as S from "./EquipamentoList.styles";

export function EquipamentoList() {
  const dispatch = useAppDispatch();
  const { lista, carregando, erro } = useAppSelector(
    (state) => state.equipamentos,
  );
  const clientes = useAppSelector((state) => state.clientes.lista);
  const [formularioAberto, setFormularioAberto] = useState(false);
  const [equipamentoEmEdicao, setEquipamentoEmEdicao] =
    useState<Equipamento | null>(null);
  useEffect(() => {
    dispatch(carregarEquipamentos());
    dispatch(carregarClientes());
  }, [dispatch]);
  function nomeDoCliente(clienteId: number): string {
    const cliente = clientes.find((c) => c.id === clienteId);
    return cliente ? cliente.nome : "Cliente não encontrado";
  }
  function abrirFormularioNovo() {
    setEquipamentoEmEdicao(null);
    setFormularioAberto(true);
  }
  function abrirFormularioEdicao(equipamento: Equipamento) {
    setEquipamentoEmEdicao(equipamento);
    setFormularioAberto(true);
  }
  function fecharFormulario() {
    setFormularioAberto(false);
    setEquipamentoEmEdicao(null);
  }
  function salvarEquipamento(dados: NovoEquipamento) {
    if (equipamentoEmEdicao) {
      dispatch(editarEquipamento({ id: equipamentoEmEdicao.id, dados }));
    } else {
      dispatch(adicionarEquipamento(dados));
    }
    fecharFormulario();
  }
  function excluirEquipamentoHandler(id: number) {
    const confirmou = window.confirm(
      "Tem certeza que deseja excluir este equipamento?",
    );
    if (confirmou) {
      dispatch(removerEquipamento(id));
    }
  }
  if (carregando) {
    return <S.Mensagem>Carregando equipamentos...</S.Mensagem>;
  }
  if (erro) {
    return <S.Mensagem>{erro}</S.Mensagem>;
  }
  if (formularioAberto) {
    return (
      <S.Container>
        <S.Titulo>
          {equipamentoEmEdicao ? "Editar equipamento" : "Novo equipamento"}
        </S.Titulo>
        <EquipamentoForm
          valoresIniciais={equipamentoEmEdicao ?? undefined}
          aoSalvar={salvarEquipamento}
          aoCancelar={fecharFormulario}
        />
      </S.Container>
    );
  }
  return (
    <S.Container>
      <S.Cabecalho>
        <S.Titulo>Equipamentos</S.Titulo>
        <S.BotaoNovo onClick={abrirFormularioNovo}>
          + Novo equipamento
        </S.BotaoNovo>
      </S.Cabecalho>
      {lista.length === 0 ? (
        <S.Mensagem>Nenhum equipamento cadastrado ainda.</S.Mensagem>
      ) : (
        <S.Tabela>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>BTUs</th>
              <th>Instalação</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lista.map((equipamento) => (
              <tr key={equipamento.id}>
                <td>{nomeDoCliente(equipamento.clienteId)}</td>
                <td>{equipamento.tipo}</td>
                <td>{equipamento.marca}</td>
                <td>{equipamento.modelo}</td>
                <td>{equipamento.capacidadeBTUs}</td>
                <td>{equipamento.dataInstalacao}</td>
                <td>
                  <S.BotaoAcao
                    onClick={() => abrirFormularioEdicao(equipamento)}
                  >
                    Editar
                  </S.BotaoAcao>
                  <S.BotaoAcao
                    onClick={() => excluirEquipamentoHandler(equipamento.id)}
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
