import React, { useState } from 'react';
import Card from 'Componentes/Card'; // Ajusta la ruta según la estructura de tu proyecto
import Modal from 'Componentes/Modal/Modal';// Ajusta la ruta según la estructura de tu proyecto
import styles from './VideoCategories.module.css';

 
const initialVideos= [
  {
    "id": 1,
    "titulo": "Cuándo usar let, var y const?",
    "link": "https://www.youtube.com/embed/PztCEdIJITY",
    "img": "/images/FrontEnd 1.png",
    "categoria": "FRONT END"
  },
  {
    "id": 2,
    "titulo": "¿Qué es JavaScript?",
    "link": "https://www.youtube.com/embed/GJfOSoaXk4s",
    "img": "/images/FrontEnd 2.png",
    "categoria": "FRONT END"
  },
  {
    "id": 3,
    "titulo": "Equipo Front End",
    "link": "https://www.youtube.com/embed/rpvrLaBQwgg",
    "img": "/images/FrontEnd 3.png",
    "categoria": "FRONT END"
  },
  {
    "id": 4,
    "titulo": "Spring Framework. ¿Qué es?",
    "link": "https://www.youtube.com/embed/t-iqt1b2qqk",
    "img": "/images/BackEnd 1.png",
    "categoria": "BACK END"
  },
  {
    "id": 5,
    "titulo": "¿Qué es SQL y NoSQL?",
    "link": "https://www.youtube.com/embed/cLLKVd5CNLc",
    "img": "/images/BackEnd 2.png",
    "categoria": "BACK END"
  },
  {
    "id": 6,
    "titulo": "Simplificando tu código en Java: Conoce los enum",
    "link": "https://www.youtube.com/embed/EoPvlE85XAQ",
    "img": "/images/BackEnd 3.png",
    "categoria": "BACK END"
  },
  {
    "id": 7,
    "titulo": "¿Qué son las Soft Skills?",
    "link": "https://www.youtube.com/embed/vhwspfvI52k",
    "img": "/images/InnovacionGestion 1.png",
    "categoria": "INNOVACION Y GESTION"
  },
  {
    "id": 8,
    "titulo": "7 Soft Skills más demandadas de 2024",
    "link": "https://www.youtube.com/embed/_-9grhDhxiU",
    "img": "/images/InnovacionGestion 2.png",
    "categoria": "INNOVACION Y GESTION"
  },
  {
    "id": 9,
    "titulo": "¿Qué son las metodologías ágiles?",
    "link": "https://www.youtube.com/embed/6N3OkLCfK-0",
    "img": "/images/InnovacionGestion 3.png",
    "categoria": "INNOVACION Y GESTION"
  },
  {
    "id": 10,
    "titulo": "Consejos para crear tu Portfolio",
    "link": "https://www.youtube.com/embed/lKaXteKYbSA",
    "img": "https://img.youtube.com/vi/lKaXteKYbSA/maxresdefault.jpg", // Miniatura de YouTube
    "categoria": "CONSEJOS"
  },
  {
    "id": 11,
    "titulo": "Front-end vs. Back-end: ¡Descubre el lado perfecto para ti!",
    "link": "https://www.youtube.com/embed/QjOWz9avkg8",
    "img": "/images/frontVsBackEnd.jpg",
    "categoria": "CONSEJOS"
  },
  {
    "id": 12,
    "titulo": "Técnicas para mejorar tu aprendizaje",
    "link": "https://www.youtube.com/embed/someLink",
    "img": "/images/mejorarAprendizaje.jpg",
    "categoria": "CONSEJOS"
  }
];


const categoryColors = {
  "FRONT END": "#6BD1FF",
  "BACK END": "#00C86F",
  "INNOVACION Y GESTION": "#FFBA05",
  CONSEJOS: "#f44336",
};

function VideoCategorias() {
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [videos, setVideos] = useState(initialVideos); // Estado para almacenar la lista de videos

  const handleEditar = (id) => {
    const selectedItem = videos.find((video) => video.id === id);
    setSelectedData(selectedItem);
    setShowModal(true); // Asegúrate de que showModal se establezca en true
  };
  
  const handleBorrar = (id) => {
    console.log(`Borrando elemento con ID: ${id}`);
    // Filtrar los videos para mantener solo aquellos cuyo ID no coincida con el ID que se está borrando
    const updatedVideos = videos.filter((video) => video.id !== id);
    setVideos(updatedVideos); // Actualizar el estado de videos con la lista filtrada
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedData(null);
  };

  // Agrupar videos por categorías
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
                handleEditar={handleEditar}
                handleBorrar={handleBorrar}
              />
            ))}
          </div>
        </div>
      ))}
      {selectedData && (
        <Modal show={showModal} onClose={handleCloseModal} data={selectedData} />
      )}
    </div>
  );
}

export default VideoCategorias;