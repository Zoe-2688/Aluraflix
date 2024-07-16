import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from 'Componentes/VideoPlayer/VideoPlayer';

function VideoDetalle() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { id } = useParams(); // Obtén el parámetro ID de la ruta

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
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching video data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      const foundVideo = videos.find(video => video.id === id); // Comparar id como string
      setSelectedVideo(foundVideo);
    }
  }, [id, videos]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!selectedVideo) {
    return <div>No se encontró el video.</div>;
  }

  return (
    <div>
      <h2>{selectedVideo.titulo}</h2>
      <VideoPlayer videoSrc={selectedVideo.link} />
    </div>
  );
}

export default VideoDetalle;
