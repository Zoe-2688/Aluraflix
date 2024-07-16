import React, { useState, useEffect } from 'react';
import Card from 'Componentes/Card';
import styles from './VideoCategorias.module.css';

const VideosCategorias = () => {
  const [videos, setVideos] = useState([]);

  const categoryColors = {
    "FRONT END": "#6BD1FF",
    "BACK END": "#00C86F",
    "INNOVACION Y GESTION": "#FFBA05",
    "CONSEJOS": "#f44336",
  };

  useEffect(() => {
    fetch('/Data/db.json')
      .then(response => response.json())
      .then(data => {
        console.log('Datos obtenidos:', data);
        if (Array.isArray(data.videos)) {
          setVideos(data.videos);
        } else {
          console.error('El formato de datos en db.json no es válido');
        }
      })
      .catch(error => console.error('Error al obtener datos de videos:', error));
  }, []);

  if (!Array.isArray(videos)) {
    return <div>Cargando videos...</div>;
  }

  const handleBorrar = (id) => {
    console.log(`Intentando borrar video con ID ${id}`);
    fetch(`http://localhost:3001/videos/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo completar la solicitud');
        }
        console.log(`Video con ID ${id} eliminado correctamente`);
        // Actualizar la lista de videos después de eliminar
        setVideos(prevVideos => prevVideos.filter(video => video.id !== id));
      })
      .catch(error => {
        console.error('Error al intentar eliminar el video:', error);
        // Mostrar mensaje de error al usuario, por ejemplo:
        alert('Hubo un problema al eliminar el video. Por favor, inténtalo de nuevo más tarde.');
      });
  };

  const videosPorCategoria = videos.reduce((acc, video) => {
    const { categoria } = video;
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(video);
    return acc;
  }, {});

  return (
    <div className={styles.videoCategories}>
      {Object.keys(videosPorCategoria).map((categoria, index) => (
        <div key={index} className={styles.category}>
          <h2
            className={styles.categoryTitle}
            style={{ backgroundColor: categoryColors[categoria] || "#888" }}
          >
            {categoria}
          </h2>
          <div className={styles.videoList}>
            {videosPorCategoria[categoria].map((video) => (
              <Card
                key={video.id}
                id={video.id}
                titulo={video.titulo}
                categoria={video.categoria}
                img={video.img}
                link={video.link}
                descripcion={video.descripcion}
                handleBorrar={() => handleBorrar(video.id)}
                handleVerVideo={() => console.log('Ver video:', video.id)}
                handleEditar={() => console.log('Editar video:', video.id)}
                videoUrl={video.link}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideosCategorias;
