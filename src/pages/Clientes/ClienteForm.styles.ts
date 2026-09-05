import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
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

  input {
    padding: 10px 12px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 6px;

    &:focus {
      outline: none;
      border-color: #2563eb;
    }
  }
`;

export const Erro = styled.span`
  font-size: 12px;
  color: #d92d20;
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
