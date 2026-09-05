import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const BotaoHamburguer = styled.button`
  display: none;
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 20;
  width: 44px;
  height: 44px;
  font-size: 22px;
  color: #fff;
  background-color: #1a1a1a;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
`;

export const Sidebar = styled.aside<{ $aberta: boolean }>`
  width: 240px;
  background-color: #1a1a1a;
  padding: 24px 16px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 15;
    transform: translateX(${(props) => (props.$aberta ? "0" : "-100%")});
    transition: transform 0.2s ease-in-out;
  }
`;

export const CabecalhoSidebar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const Logo = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
`;

export const BotaoFechar = styled.button`
  display: none;
  color: #fff;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
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
  padding: 8px;

  @media (max-width: 768px) {
    padding: 8px;
    padding-top: 72px;
  }
`;
