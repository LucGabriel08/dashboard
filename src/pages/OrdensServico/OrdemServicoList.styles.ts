import styled, { css } from "styled-components";

export const Container = styled.div`
  padding: 24px;
  max-width: 1100px;
  margin: 0 auto;
`;

export const Cabecalho = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Titulo = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
`;

export const Mensagem = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
  padding: 32px 0;
`;

export const BotaoNovo = styled.button`
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background-color: #2563eb;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: #f2f2f2;
  }

  th,
  td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #e0e0e0;
  }

  th {
    font-size: 14px;
    color: #444;
    font-weight: 600;
  }

  td {
    font-size: 14px;
    color: #222;
  }

  tbody tr:hover {
    background-color: #fafafa;
  }
`;

export const BotaoAcao = styled.button<{ $perigo?: boolean }>`
  padding: 6px 10px;
  margin-right: 8px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: transparent;
  cursor: pointer;
  color: #444;

  &:hover {
    background-color: #f5f5f5;
  }

  ${(props) =>
    props.$perigo &&
    css`
      color: #d92d20;
      border-color: #d92d20;

      &:hover {
        background-color: #fef2f2;
      }
    `}
`;
