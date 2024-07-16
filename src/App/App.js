import React, { useState, useEffect } from 'react';
import Cabecera from 'Componentes/Cabecera';
import Pie from '../Componentes/Pie/Pie';
import AppRoutes from '../routes'; // Asegúrate de que la ruta sea correcta
import Banner from 'Componentes/Banner';

function App() {
  const categorias = ['FRONT END', 'BACK END', 'INNOVACION Y GESTION', 'CONSEJOS'];
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/videos')
      .then(response => response.json())
      .then(data => setVideos(data.videos))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  const handleEditar = (id, formData) => {
    console.log('Editando video con ID:', id, 'Datos:', formData);
    // Aquí puedes implementar la lógica para enviar una solicitud PUT o PATCH al servidor
  };

  const handleBorrar = (id) => {
    console.log(`Intentando borrar video con ID ${id}`);
    // Aquí puedes implementar la lógica para enviar una solicitud DELETE al servidor
    // No necesitas implementar esta función si no estás usando un servidor backend
  };

  return (
    <div className="app">
      <Cabecera />
      <AppRoutes categorias={categorias} videos={videos} handleEditar={handleEditar} handleBorrar={handleBorrar} /> {/* Pasa categorias y funciones como props */}
      <Pie />
    </div>
  );
}

export default App;
