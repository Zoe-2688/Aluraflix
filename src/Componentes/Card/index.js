import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import iconBorrar from './Borrar.png';
import iconEditar from './editar.png';
import Modal from '../../Componentes/Modal/Modal'; // Ajusta la ruta si es necesario
import VideoPlayer from '../../Componentes/VideoPlayer/VideoPlayer'; // Ajusta la ruta si es necesario

function Card({ id, img, titulo, handleEditar, handleBorrar, videoUrl }) {
  const [showModal, setShowModal] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const handleOpenModal = () => {
    setEditingData({ id, titulo, videoUrl }); // Ajusta según la lógica de edición
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveModal = (formData) => {
    handleEditar(id, formData); // Llama a la función handleEditar con los datos del formulario
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <Link className={styles.link} to={`/video/${id}`}> {/* Enlace dinámico al detalle del video */}
        <img
          src={process.env.PUBLIC_URL + img}
          className={styles.capa}
          alt={titulo}
        />
      </Link>
      <div className={styles.opciones}>
        <img
          src={iconBorrar}
          alt="Icono borrar"
          className={`${styles.icon} ${styles.iconBorrar}`}
          onClick={() => handleBorrar(id)}
        />
        <span className={styles.opcionText}>borrar</span>
        <img
          src={iconEditar}
          alt="Icono editar"
          className={`${styles.icon} ${styles.iconEditar}`}
          onClick={handleOpenModal}
        />
        <span className={styles.opcionText}>editar</span>
      </div>
      <Modal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveModal}
        initialData={editingData}
      />
      <VideoPlayer videoSrc={videoUrl} /> {/* Pasa la URL del video como prop */}
    </div>
  );
}

export default Card;
