import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import iconBorrar from './Borrar.png';
import iconEditar from './editar.png';
import Modal from '../../Componentes/Modal/Modal';

function Card({ id, titulo, categoria, img, link, descripcion, handleEditar, handleBorrar }) {
  const [showModal, setShowModal] = React.useState(false);
  const [editingData, setEditingData] = React.useState(null);

  const handleOpenModal = () => {
    setEditingData({ id, titulo, categoria, img, link, descripcion });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveModal = (formData) => {
    handleEditar(id, formData);
    setShowModal(false);
  };

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
    </div>
  );
}

export default Card;
