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
                img={video.img}
                titulo={video.titulo}
                handleBorrar={() => console.log('Borrar video:', video.id)}
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
