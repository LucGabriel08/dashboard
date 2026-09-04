import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./Layout";
import { ClientesList } from "../pages/Clientes/ClientesList";
import { EquipamentoList } from "../pages/Equipamentos/EquipamentoList";
import { OrdemServicoList } from "../pages/OrdensServico/OrdemServicoList";
import { GastoList } from "../pages/Gastos/GastoList";
import { Financeiro } from "../pages/Financeiro/Financeiro";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/clientes" replace />} />
          <Route path="/clientes" element={<ClientesList />} />
          <Route path="/equipamentos" element={<EquipamentoList />} />
          <Route path="/ordens-servico" element={<OrdemServicoList />} />
          <Route path="/gastos" element={<GastoList />} />
          <Route path="/financeiro" element={<Financeiro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
