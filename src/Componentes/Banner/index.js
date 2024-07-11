import React, { useState, useEffect } from 'react';
import BannerVideo from '../BannerVideo/BannerVideo';
import styles from './Banner.module.css';

const bannerImageUrl = `${process.env.PUBLIC_URL}/images/banner.png`;

function Banner() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/Data/db.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => setVideos(data.videos))
      .catch(error => {
        console.error("Error fetching the JSON file:", error);
      });
  }, []);

  const videoId = 0; // Cambia esto según el ID del video que deseas mostrar
  const video = videos.find(video => video.id === videoId);

  if (!video) {
    return <div>Cargando...</div>;
  }

  return (
    <div
      className={styles.capa}
      style={{ backgroundImage: `url(${bannerImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className={styles.textContainer}>
        <button className={`${styles.button} roboto-condensed`} style={{ color: `var(--blanco)` }}>FRONT END</button>
        <h1 className={`${styles.title} roboto-condensed`}>Challenge React</h1>
        <p className={`${styles.subtitle} roboto-condensed`}>
          Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.
        </p>
        <BannerVideo id={videoId} />
      </div>
    </div>
  );
}

export default Banner;
