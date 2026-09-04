import styled from "styled-components";

export const CORES_STATUS = ["#f59e0b", "#3b82f6", "#16a34a"];
export const CORES_CATEGORIA = ["#2563eb", "#f59e0b", "#16a34a", "#6b7280"];

export const Container = styled.div`
  padding: 24px;
  max-width: 1100px;
  margin: 0 auto;
`;

export const Titulo = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 24px;
`;

export const Cards = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

export const Card = styled.div<{ $destaque?: boolean }>`
  flex: 1;
  min-width: 200px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${(props) => (props.$destaque ? "#16a34a" : "#2563eb")};
`;

export const CardLabel = styled.p`
  font-size: 13px;
  color: #666;
  margin-bottom: 4px;
`;

export const CardValor = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
`;

export const Graficos = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
`;

export const GraficoBox = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

export const SubTitulo = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
`;
