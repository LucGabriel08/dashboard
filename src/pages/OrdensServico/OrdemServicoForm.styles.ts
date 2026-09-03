import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 560px;
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

export const Campo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }

  input,
  select,
  textarea {
    padding: 10px 12px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: #fff;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: #2563eb;
    }

    &:disabled {
      background-color: #f5f5f5;
      color: #999;
      cursor: not-allowed;
    }
  }

  textarea {
    resize: vertical;
    min-height: 60px;
  }
`;

export const Erro = styled.span`
  font-size: 12px;
  color: #d92d20;
`;

export const SecaoMateriais = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
`;

export const SubTitulo = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const LinhaAdicionarMaterial = styled.div`
  display: flex;
  gap: 8px;

  select {
    flex: 2;
    padding: 8px 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  input {
    flex: 1;
    padding: 8px 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
`;

export const BotaoAdicionarMaterial = styled.button`
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background-color: #16a34a;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #15803d;
  }
`;

export const ListaMateriais = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
`;

export const ItemMaterial = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: #f9fafb;
  border-radius: 6px;
  font-size: 13px;
  color: #333;

  button {
    padding: 4px 10px;
    font-size: 12px;
    color: #d92d20;
    background-color: transparent;
    border: 1px solid #d92d20;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #fef2f2;
    }
  }
`;

export const CustoTotal = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-align: right;
`;

export const Botoes = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
`;

export const BotaoCancelar = styled.button`
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #444;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const BotaoSalvar = styled.button`
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
