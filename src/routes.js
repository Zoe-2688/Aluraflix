import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import PaginaBase from 'Pages/PaginaBase';
import NuevoVideo from 'Componentes/NuevoVideo/NuevoVideo'; // Ajusta la ruta según la estructura de tu proyecto

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaBase />}>
          <Route index element={<Inicio />} />
          <Route path="nuevo-video" element={<NuevoVideo />} /> {/* Nueva ruta para NuevoVideo */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
