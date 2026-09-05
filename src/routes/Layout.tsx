import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import * as S from "./Layout.styles";

export function Layout() {
  const [menuAberto, setMenuAberto] = useState(false);

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <S.Container>
      <S.BotaoHamburguer onClick={() => setMenuAberto(true)}>
        ☰
      </S.BotaoHamburguer>

      {menuAberto && <S.Overlay onClick={fecharMenu} />}

      <S.Sidebar $aberta={menuAberto}>
        <S.CabecalhoSidebar>
          <S.Logo>Dashboard</S.Logo>
          <S.BotaoFechar onClick={fecharMenu}>✕</S.BotaoFechar>
        </S.CabecalhoSidebar>
        <S.NavLista>
          <NavLink
            to="/clientes"
            className={({ isActive }) => (isActive ? "ativo" : "")}
            onClick={fecharMenu}
          >
            Clientes
          </NavLink>
          <NavLink
            to="/equipamentos"
            className={({ isActive }) => (isActive ? "ativo" : "")}
            onClick={fecharMenu}
          >
            Equipamentos
          </NavLink>
          <NavLink
            to="/ordens-servico"
            className={({ isActive }) => (isActive ? "ativo" : "")}
            onClick={fecharMenu}
          >
            Ordens de Serviço
          </NavLink>
          <NavLink
            to="/gastos"
            className={({ isActive }) => (isActive ? "ativo" : "")}
            onClick={fecharMenu}
          >
            Gastos
          </NavLink>
          <NavLink
            to="/financeiro"
            className={({ isActive }) => (isActive ? "ativo" : "")}
            onClick={fecharMenu}
          >
            Financeiro
          </NavLink>
        </S.NavLista>
      </S.Sidebar>

      <S.Conteudo>
        <Outlet />
      </S.Conteudo>
    </S.Container>
  );
}
