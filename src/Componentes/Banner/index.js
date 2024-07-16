import React, { useState, useEffect } from 'react';
import styles from './Banner.module.css';
import BannerVideo from 'Componentes/BannerVideo/BannerVideo';

const bannerImageUrl = `${process.env.PUBLIC_URL}/images/banner.png`;

function Banner() {
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    // Simular una carga de datos, como la obtención de un JSON
    setTimeout(() => {
      setLoading(false); // Marcar la carga como completada
    }, 2000); // Simular un tiempo de carga de 2 segundos
  }, []);

  if (loading) {
    return <div>Cargando...</div>; // Mostrar mensaje de carga mientras se obtienen los datos
  }

  return (
    <div
      className={styles.capa}
      style={{
        backgroundImage: `url(${bannerImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%', // Ajusta según el diseño
        height: '1000px', // Ajusta según el diseño
      }}
    >
      <div className={styles.textContainer}>
        <button className={`${styles.button} roboto-condensed`} style={{ color: `var(--blanco)` }}>FRONT END</button>
        <h1 className={`${styles.title} roboto-condensed`}>Challenge React</h1>
        <p className={`${styles.subtitle} roboto-condensed`}>
          Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.
        </p>
      </div>
      <BannerVideo/>
    </div>
  );
}

export default Banner;
