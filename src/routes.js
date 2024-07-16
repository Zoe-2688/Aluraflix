import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PaginaBase from './Pages/PaginaBase';
import Inicio from './Pages/Inicio';
import NuevoVideo from './Componentes/NuevoVideo/NuevoVideo';
import VideosCategorias from './Componentes/VideosCategorias/VideoCategorias';
import VideoDetalle from './Componentes/VideoDetalle/VideoDetalle';

function AppRoutes({ categorias }) {
  return (
    <Routes>
      <Route path="/" element={<PaginaBase />}>
        <Route index element={<Inicio />} />
        <Route path="/videos" element={<VideosCategorias />} />
        <Route path="/nuevo-video" element={<NuevoVideo categorias={categorias} />} /> {/* Pasa categorias */}
        <Route path="/video/:id" element={<VideoDetalle />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
