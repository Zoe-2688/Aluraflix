import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./BannerVideo.module.css";

function BannerVideo() {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true); // Estado para controlar la visibilidad

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/Data/db.json`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setVideos(data.videos);
    } catch (error) {
      console.error("Error fetching the JSON file:", error);
    }
  };

  // Manejar el cambio de índice para avanzar al siguiente video
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  // Manejar el cambio de índice para retroceder al video anterior
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  // Función para alternar la visibilidad del componente
  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState); // Cambiar el estado de visibilidad
  };

  // Si no hay videos cargados, mostrar un mensaje de carga
  if (videos.length === 0) {
    return <div>Cargando...</div>;
  }

  // Obtener el video actual según el índice actual
  const video = videos[currentIndex];

  return (
    <div className={styles.wrapper}>
      {isVisible && (
        <div className={styles.container}>
          <Link className={styles.link} to={`/${video.id}`}>
            <img src={process.env.PUBLIC_URL + video.img} className={styles.capa} alt={video.titulo} />
          </Link>
          <div className={styles.navTop}>
            <button onClick={handlePrev} className={styles.navButton}>
              ←
            </button>
            <button onClick={handleNext} className={styles.navButton}>
              →
            </button>
          </div>
          <h2 className={styles.title}>{video.titulo}</h2>
          <p className={styles.category}>{video.categoria}</p>
          <div className={styles.toggleContainer}>
            <button onClick={toggleVisibility} className={styles.toggleButton}>
              {isVisible ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BannerVideo;
