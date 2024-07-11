import React from 'react';
import styles from './Card.module.css';
import iconBorrar from './Borrar.png';
import iconEditar from './editar.png';
import { Link } from 'react-router-dom';

function Card({ id, img, titulo, handleEditar, handleBorrar }) {
  return (
    <div className={styles.container}>
      <Link className={styles.link} to={`/${id}`}>
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
          onClick={() => handleBorrar(id)} // Llamar handleBorrar con el ID del video
        />
        <span className={styles.opcionText}>borrar</span>
        <img
          src={iconEditar}
          alt="Icono editar"
          className={`${styles.icon} ${styles.iconEditar}`}
          onClick={() => handleEditar(id)} // Llamar handleEditar con el ID del video
        />
        <span className={styles.opcionText}>editar</span>
      </div>
    </div>
  );
}

export default Card;
