import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  carregarGastos,
  adicionarGasto,
  editarGasto,
  removerGasto,
} from "../../redux/slices/gastosSlice";
import type { Gasto, NovoGasto } from "../../types/Gasto";
import { GastoForm } from "./GastoForm";
import * as S from "./GastoList.styles";

const categoriaLabel: Record<string, string> = {
  material: "Material",
  combustivel: "Combustível",
  ferramenta: "Ferramenta",
  outro: "Outro",
};

export function GastoList() {
  const dispatch = useAppDispatch();
  const { lista, carregando, erro } = useAppSelector((state) => state.gastos);

  const [formularioAberto, setFormularioAberto] = useState(false);
  const [gastoEmEdicao, setGastoEmEdicao] = useState<Gasto | null>(null);

  useEffect(() => {
    dispatch(carregarGastos());
  }, [dispatch]);

  function abrirFormularioNovo() {
    setGastoEmEdicao(null);
    setFormularioAberto(true);
  }

  function abrirFormularioEdicao(gasto: Gasto) {
    setGastoEmEdicao(gasto);
    setFormularioAberto(true);
  }

  function fecharFormulario() {
    setFormularioAberto(false);
    setGastoEmEdicao(null);
  }

  function salvarGasto(dados: NovoGasto) {
    if (gastoEmEdicao) {
      dispatch(editarGasto({ id: gastoEmEdicao.id, dados }));
    } else {
      dispatch(adicionarGasto(dados));
    }
    fecharFormulario();
  }

  function excluirGastoHandler(id: number) {
    const confirmou = window.confirm(
      "Tem certeza que deseja excluir este gasto?",
    );
    if (confirmou) {
      dispatch(removerGasto(id));
    }
  }

  if (carregando) {
    return <S.Mensagem>Carregando gastos...</S.Mensagem>;
  }

  if (erro) {
    return <S.Mensagem>{erro}</S.Mensagem>;
  }

  if (formularioAberto) {
    return (
      <S.Container>
        <S.Titulo>{gastoEmEdicao ? "Editar gasto" : "Novo gasto"}</S.Titulo>
        <GastoForm
          valoresIniciais={gastoEmEdicao ?? undefined}
          aoSalvar={salvarGasto}
          aoCancelar={fecharFormulario}
        />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Cabecalho>
        <S.Titulo>Gastos</S.Titulo>
        <S.BotaoNovo onClick={abrirFormularioNovo}>+ Novo gasto</S.BotaoNovo>
      </S.Cabecalho>

      {lista.length === 0 ? (
        <S.Mensagem>Nenhum gasto cadastrado ainda.</S.Mensagem>
      ) : (
        <S.Tabela>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Data</th>
              <th>Valor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lista.map((gasto) => (
              <tr key={gasto.id}>
                <td>{gasto.descricao}</td>
                <td>{categoriaLabel[gasto.categoria]}</td>
                <td>{gasto.data}</td>
                <td>R$ {gasto.valor}</td>
                <td>
                  <S.BotaoAcao onClick={() => abrirFormularioEdicao(gasto)}>
                    Editar
                  </S.BotaoAcao>
                  <S.BotaoAcao
                    onClick={() => excluirGastoHandler(gasto.id)}
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
