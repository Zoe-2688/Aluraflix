import React, { useState, useEffect } from "react";
import Card from "./Card";

function VideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/Data/db.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos obtenidos:", data);
        setVideos(data.videos); // Asigna todos los videos, sin filtrar
      })
      .catch((error) =>
        console.error("Error fetching video data:", error)
      );
  }, []);

  const addVideo = (newVideo) => {
    setVideos([...videos, newVideo]); // Agrega el nuevo video al estado
  };

  const handleBorrar = (id) => {
    console.log(`Intentando borrar video con ID ${id}`);
    fetch(`/videos/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al borrar el video');
        }
        console.log(`Video con ID ${id} borrado correctamente`);
        // Actualizar el estado local después de borrar el video
        setVideos(prevVideos => prevVideos.filter(video => video.id !== id));
      })
      .catch(error => {
        console.error('Error al borrar el video:', error);
        // Manejar el error adecuadamente, mostrar un mensaje al usuario, etc.
      });
  };

  return (
    <div className="videoList">
      {videos.map((video) => (
        <Card
          key={video.id}
          id={video.id}
          img={video.img}
          titulo={video.titulo}
          onDelete={handleBorrar} // Pasa la función handleBorrar al componente Card
        />
      ))}
    </div>
  );
}

export default VideoList;

