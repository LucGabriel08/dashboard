import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Sidebar = styled.aside`
  width: 240px;
  background-color: #1a1a1a;
  padding: 24px 16px;
  flex-shrink: 0;
`;

export const Logo = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 32px;
`;

export const NavLista = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;

  a {
    color: #d1d5db;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    padding: 10px 12px;
    border-radius: 6px;

    &:hover {
      background-color: #2a2a2a;
      color: #fff;
    }

    &.ativo {
      background-color: #2563eb;
      color: #fff;
    }
  }
`;

export const Conteudo = styled.main`
  flex: 1;
  background-color: #f9fafb;
  overflow-y: auto;
`;
