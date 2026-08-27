import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  carregarClientes,
  adicionarCliente,
  editarCliente,
  removerCliente,
} from "../../redux/slices/clientesSlice";
import type { Cliente, NovoCliente } from "../../types/Cliente";
import { ClienteForm } from "./ClienteForm";
import * as S from "./ClientesList.styles";

export function ClientesList() {
  const dispatch = useAppDispatch();
  const { lista, carregando, erro } = useAppSelector((state) => state.clientes);

  const [formularioAberto, setFormularioAberto] = useState(false);
  const [clienteEmEdicao, setClienteEmEdicao] = useState<Cliente | null>(null);

  useEffect(() => {
    dispatch(carregarClientes());
  }, [dispatch]);

  function abrirFormularioNovo() {
    setClienteEmEdicao(null);
    setFormularioAberto(true);
  }

  function abrirFormularioEdicao(cliente: Cliente) {
    setClienteEmEdicao(cliente);
    setFormularioAberto(true);
  }

  function fecharFormulario() {
    setFormularioAberto(false);
    setClienteEmEdicao(null);
  }

  function salvarCliente(dados: NovoCliente) {
    if (clienteEmEdicao) {
      dispatch(editarCliente({ id: clienteEmEdicao.id, dados }));
    } else {
      dispatch(adicionarCliente(dados));
    }
    fecharFormulario();
  }

  function excluirCliente(id: number) {
    const confirmou = window.confirm(
      "Tem certeza que deseja excluir este cliente?",
    );
    if (confirmou) {
      dispatch(removerCliente(id));
    }
  }

  if (carregando) {
    return <S.Mensagem>Carregando clientes...</S.Mensagem>;
  }

  if (erro) {
    return <S.Mensagem>{erro}</S.Mensagem>;
  }

  if (formularioAberto) {
    return (
      <S.Container>
        <S.Titulo>
          {clienteEmEdicao ? "Editar cliente" : "Novo cliente"}
        </S.Titulo>
        <ClienteForm
          valoresIniciais={clienteEmEdicao ?? undefined}
          aoSalvar={salvarCliente}
          aoCancelar={fecharFormulario}
        />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Cabecalho>
        <S.Titulo>Clientes</S.Titulo>
        <S.BotaoNovo onClick={abrirFormularioNovo}>+ Novo cliente</S.BotaoNovo>
      </S.Cabecalho>

      {lista.length === 0 ? (
        <S.Mensagem>Nenhum cliente cadastrado ainda.</S.Mensagem>
      ) : (
        <S.Tabela>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>E-mail</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lista.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.email || "-"}</td>
                <td>
                  <S.BotaoAcao onClick={() => abrirFormularioEdicao(cliente)}>
                    Editar
                  </S.BotaoAcao>
                  <S.BotaoAcao
                    onClick={() => excluirCliente(cliente.id)}
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
