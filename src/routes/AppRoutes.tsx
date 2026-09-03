import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ClientesList } from "../pages/Clientes/ClientesList";
import { EquipamentoList } from "../pages/Equipamentos/EquipamentoList";
import { OrdemServicoList } from "../pages/OrdensServico/OrdemServicoList";
import * as S from "./AppRoutes.styles";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <S.Nav>
        <Link to="/clientes">Clientes</Link>
        <Link to="/equipamentos">Equipamentos</Link>
        <Link to="/ordens-servico">Ordens de Serviço</Link>
      </S.Nav>
      <Routes>
        <Route path="/clientes" element={<ClientesList />} />
        <Route path="/equipamentos" element={<EquipamentoList />} />
        <Route path="/ordens-servico" element={<OrdemServicoList />} />
      </Routes>
    </BrowserRouter>
  );
}
