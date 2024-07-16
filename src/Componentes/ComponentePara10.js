import React from 'react';

function ComponentePara10() {
  // Información del video con id: 10
  const videoInfo = {
    id: 10,
    titulo: "Consejos para crear tu Portfolio",
    link: "https://www.youtube.com/embed/lKaXteKYbSA",
    img: "/images/portafolio.jpg",
    categoria: "Consejos"
  };

  return (
    <div>
      <h2>{videoInfo.titulo}</h2>
      <img src={videoInfo.img} alt={videoInfo.titulo} />
      <div>
        <iframe
          width="560"
          height="315"
          src={videoInfo.link}
          title={videoInfo.titulo}
          frameBorder="0" // Cambiado a frameBorder en camelCase
          allowFullScreen // Cambiado a allowFullScreen en camelCase
        ></iframe>
      </div>
    </div>
  );
}

export default ComponentePara10;
