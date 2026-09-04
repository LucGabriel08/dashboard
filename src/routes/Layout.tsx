import { Outlet, NavLink } from "react-router-dom";
import * as S from "./Layout.styles";

export function Layout() {
  return (
    <S.Container>
      <S.Sidebar>
        <S.Logo> Dashboard </S.Logo>
        <S.NavLista>
          <NavLink
            to="/clientes"
            className={({ isActive }) => (isActive ? "ativo" : "")}
          >
            Clientes
          </NavLink>
          <NavLink
            to="/equipamentos"
            className={({ isActive }) => (isActive ? "ativo" : "")}
          >
            Equipamentos
          </NavLink>
          <NavLink
            to="/ordens-servico"
            className={({ isActive }) => (isActive ? "ativo" : "")}
          >
            Ordens de Serviço
          </NavLink>
          <NavLink
            to="/gastos"
            className={({ isActive }) => (isActive ? "ativo" : "")}
          >
            Gastos
          </NavLink>
          <NavLink
            to="/financeiro"
            className={({ isActive }) => (isActive ? "ativo" : "")}
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
