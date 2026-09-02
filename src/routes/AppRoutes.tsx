import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ClientesList } from "../pages/Clientes/ClientesList";
import { EquipamentoList } from "../pages/Equipamentos/EquipamentoList";
import * as S from "./AppRoutes.styles";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <S.Nav>
        <Link to="/clientes">Clientes</Link>
        <Link to="/equipamentos">Equipamentos</Link>
      </S.Nav>
      <Routes>
        <Route path="/clientes" element={<ClientesList />} />
        <Route path="/equipamentos" element={<EquipamentoList />} />
      </Routes>
    </BrowserRouter>
  );
}
