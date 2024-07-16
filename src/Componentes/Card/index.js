import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import iconBorrar from './Borrar.png';
import iconEditar from './editar.png';
import Modal from '../../Componentes/Modal/Modal';
import VideoPlayer from '../../Componentes/VideoPlayer/VideoPlayer';

function Card({ id, titulo, categoria,img, link, descripcion, handleEditar, handleBorrar, videoUrl }) {
  const [showModal, setShowModal] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // Function to open modal for editing
  const handleOpenModal = () => {
    setEditingData({ id, titulo, categoria, img, link, descripcion }); // Adjust according to edit logic
    setShowModal(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to save edited data
  const handleSaveModal = (formData) => {
    handleEditar(id, formData); // Call handleEditar function with form data
    setShowModal(false);
  };

  // Render the component
  return (
    <div className={styles.container}>
      <Link className={styles.link} to={`/video/${id}`}>
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
      <VideoPlayer videoSrc={videoUrl} />
    </div>
  );
}

export default Card;
