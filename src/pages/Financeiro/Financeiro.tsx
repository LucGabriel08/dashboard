import { useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { carregarOrdensServico } from "../../redux/slices/ordensServicoSlice";
import { carregarGastos } from "../../redux/slices/gastosSlice";
import * as S from "./Financeiro.styles";

export function Financeiro() {
  const dispatch = useAppDispatch();
  const ordensServico = useAppSelector((state) => state.ordensServico.lista);
  const gastos = useAppSelector((state) => state.gastos.lista);

  useEffect(() => {
    dispatch(carregarOrdensServico());
    dispatch(carregarGastos());
  }, [dispatch]);

  const faturamentoTotal = useMemo(
    () => ordensServico.reduce((total, os) => total + os.valorCobrado, 0),
    [ordensServico],
  );

  const gastosTotal = useMemo(
    () => gastos.reduce((total, gasto) => total + gasto.valor, 0),
    [gastos],
  );

  const lucro = faturamentoTotal - gastosTotal;

  const dadosResumo = [
    { nome: "Faturamento", valor: faturamentoTotal },
    { nome: "Gastos", valor: gastosTotal },
    { nome: "Lucro", valor: lucro },
  ];

  const dadosStatus = useMemo(() => {
    const contagem = { agendado: 0, em_andamento: 0, concluido: 0 };
    ordensServico.forEach((os) => {
      contagem[os.status] += 1;
    });
    return [
      { nome: "Agendado", quantidade: contagem.agendado },
      { nome: "Em andamento", quantidade: contagem.em_andamento },
      { nome: "Concluído", quantidade: contagem.concluido },
    ];
  }, [ordensServico]);

  const dadosCategoriaGasto = useMemo(() => {
    const somaPorCategoria: Record<string, number> = {
      material: 0,
      combustivel: 0,
      ferramenta: 0,
      outro: 0,
    };
    gastos.forEach((gasto) => {
      somaPorCategoria[gasto.categoria] += gasto.valor;
    });
    return [
      { nome: "Material", valor: somaPorCategoria.material },
      { nome: "Combustível", valor: somaPorCategoria.combustivel },
      { nome: "Ferramenta", valor: somaPorCategoria.ferramenta },
      { nome: "Outro", valor: somaPorCategoria.outro },
    ].filter((item) => item.valor > 0);
  }, [gastos]);

  const resumoSemanal = useMemo(() => {
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth();

    const inicioMes = new Date(anoAtual, mesAtual, 1);
    const fimMes = new Date(anoAtual, mesAtual + 1, 0);

    function numeroDaSemanaNoMes(data: Date): number {
      return Math.ceil((data.getDate() + inicioMes.getDay()) / 7);
    }

    const semanas: Record<number, { faturamento: number; gastos: number }> = {};

    ordensServico.forEach((os) => {
      const data = new Date(os.data + "T00:00:00");
      if (data >= inicioMes && data <= fimMes) {
        const semana = numeroDaSemanaNoMes(data);
        if (!semanas[semana]) {
          semanas[semana] = { faturamento: 0, gastos: 0 };
        }
        semanas[semana].faturamento += os.valorCobrado;
      }
    });

    gastos.forEach((gasto) => {
      const data = new Date(gasto.data + "T00:00:00");
      if (data >= inicioMes && data <= fimMes) {
        const semana = numeroDaSemanaNoMes(data);
        if (!semanas[semana]) {
          semanas[semana] = { faturamento: 0, gastos: 0 };
        }
        semanas[semana].gastos += gasto.valor;
      }
    });

    return Object.keys(semanas)
      .map(Number)
      .sort((a, b) => a - b)
      .map((numeroSemana) => ({
        semana: numeroSemana,
        faturamento: semanas[numeroSemana].faturamento,
        gastos: semanas[numeroSemana].gastos,
        lucro: semanas[numeroSemana].faturamento - semanas[numeroSemana].gastos,
      }));
  }, [ordensServico, gastos]);

  const totalMes = useMemo(() => {
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth();

    const faturamentoMes = ordensServico
      .filter((os) => {
        const data = new Date(os.data + "T00:00:00");
        return data.getFullYear() === anoAtual && data.getMonth() === mesAtual;
      })
      .reduce((total, os) => total + os.valorCobrado, 0);

    const gastosMes = gastos
      .filter((gasto) => {
        const data = new Date(gasto.data + "T00:00:00");
        return data.getFullYear() === anoAtual && data.getMonth() === mesAtual;
      })
      .reduce((total, gasto) => total + gasto.valor, 0);

    return {
      faturamento: faturamentoMes,
      gastos: gastosMes,
      lucro: faturamentoMes - gastosMes,
    };
  }, [ordensServico, gastos]);

  return (
    <S.Container>
      <S.Titulo>Financeiro</S.Titulo>

      <S.Cards>
        <S.Card>
          <S.CardLabel>Faturamento</S.CardLabel>
          <S.CardValor>R$ {faturamentoTotal.toFixed(2)}</S.CardValor>
        </S.Card>
        <S.Card>
          <S.CardLabel>Gastos</S.CardLabel>
          <S.CardValor>R$ {gastosTotal.toFixed(2)}</S.CardValor>
        </S.Card>
        <S.Card $destaque>
          <S.CardLabel>Lucro</S.CardLabel>
          <S.CardValor>R$ {lucro.toFixed(2)}</S.CardValor>
        </S.Card>
      </S.Cards>

      <S.SecaoSemanal>
        <S.SubTitulo>Resumo por semana (mês atual)</S.SubTitulo>
        <S.TabelaSemanal>
          <thead>
            <tr>
              <th>Semana</th>
              <th>Faturamento</th>
              <th>Gastos</th>
              <th>Lucro</th>
            </tr>
          </thead>
          <tbody>
            {resumoSemanal.map((item) => (
              <tr key={item.semana}>
                <td>Semana {item.semana}</td>
                <td>R$ {item.faturamento.toFixed(2)}</td>
                <td>R$ {item.gastos.toFixed(2)}</td>
                <td>R$ {item.lucro.toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td>
                <strong>Total do mês</strong>
              </td>
              <td>
                <strong>R$ {totalMes.faturamento.toFixed(2)}</strong>
              </td>
              <td>
                <strong>R$ {totalMes.gastos.toFixed(2)}</strong>
              </td>
              <td>
                <strong>R$ {totalMes.lucro.toFixed(2)}</strong>
              </td>
            </tr>
          </tbody>
        </S.TabelaSemanal>
      </S.SecaoSemanal>

      <S.Graficos>
        <S.GraficoBox>
          <S.SubTitulo>Faturamento x Gastos x Lucro</S.SubTitulo>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dadosResumo}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="valor" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </S.GraficoBox>

        <S.GraficoBox>
          <S.SubTitulo>Ordens de Serviço por status</S.SubTitulo>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={dadosStatus}
                dataKey="quantidade"
                nameKey="nome"
                outerRadius={90}
                label
              >
                {dadosStatus.map((_, index) => (
                  <Cell key={index} fill={S.CORES_STATUS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </S.GraficoBox>

        {dadosCategoriaGasto.length > 0 && (
          <S.GraficoBox>
            <S.SubTitulo>Gastos por categoria</S.SubTitulo>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={dadosCategoriaGasto}
                  dataKey="valor"
                  nameKey="nome"
                  outerRadius={90}
                  label
                >
                  {dadosCategoriaGasto.map((_, index) => (
                    <Cell key={index} fill={S.CORES_CATEGORIA[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </S.GraficoBox>
        )}
      </S.Graficos>
    </S.Container>
  );
}
