import React, { useState, useEffect } from "react";
import Card from "./Card";

function VideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Simular una llamada fetch a db.json
    fetch("/Data/db.json")
      .then((response) => response.json())
      .then((data) => {
        // Filtrar los videos del ID 1 al 9
        const filteredVideos = data.videos.filter(video => video.id >= 1 && video.id <= 9);
        setVideos(filteredVideos);
      })
      .catch((error) => console.error("Error fetching video data:", error));
  }, []);

  return (
    <div className={styles.videoList}>
      {videos.map((video) => (
        <Card
          key={video.id}
          id={video.id}
          img={video.img} // Pasar la imagen al componente Card
          titulo={video.titulo}
        />
      ))}
    </div>
  );
}

export default VideoList;
