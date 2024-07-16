// App.js
import React, { useState, useEffect } from 'react';
import Cabecera from 'Componentes/Cabecera';
import Pie from '../Componentes/Pie/Pie';
import AppRoutes from '../routes'; // Asegúrate de que la ruta sea correcta
import Banner from 'Componentes/Banner';
import ReproductorYouTube from 'ReproductorYoutube'; // Importa el componente ReproductorYouTube

function App() {
  const categorias = ['FRONT END', 'BACK END', 'INNOVACION Y GESTION', 'CONSEJOS'];
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:3000/videos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Datos obtenidos:', data);
        setVideos(data.videos);
      } catch (error) {
        
      }
    };

    fetchVideos();
  }, []);

  const handleEditar = (id, formData) => {
    console.log('Editando video con ID:', id, 'Datos:', formData);
    // Implementa lógica para enviar solicitud PUT o PATCH al servidor
  };

  const handleBorrar = (id) => {
    console.log(`Intentando borrar video con ID ${id}`);
    // Implementa lógica para enviar solicitud DELETE al servidor
  };

  return (
    <div className="app">
      <Cabecera />
      <AppRoutes categorias={categorias} videos={videos} handleEditar={handleEditar} handleBorrar={handleBorrar} />
      {/* Renderiza cada video con su respectivo ReproductorYouTube */}
      {videos.map((video) => (
        <ReproductorYouTube key={video.id} videoId={extractVideoId(video.link)} />
      ))}
      <Pie />
    </div>
  );
}

// Función para extraer el ID del video de YouTube desde el enlace
const extractVideoId = (link) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = link.match(regex);
  return match ? match[1] : '';
};

export default App;
