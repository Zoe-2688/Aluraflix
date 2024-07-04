// Card.js
import React from "react";
import styles from "./Card.module.css";
import iconBorrar from "./Borrar.png";
import iconEditar from "./editar.png";
import { Link } from "react-router-dom";

function Card({ id, capa, titulo }) {
  // Lógica de borrar el elemento con el ID específico
  const handleBorrar = () => {
    console.log(`Borrando elemento con ID: ${id}`);
    // Aquí puedes implementar la lógica para borrar el elemento
  };

  // Lógica de editar el elemento con el ID específico
  const handleEditar = () => {
    console.log(`Editando elemento con ID: ${id}`);
    // Aquí puedes implementar la lógica para editar el elemento
  };

  return (
    <div className={styles.container}>
      <Link className={styles.link} to={`/${id}`}>
        <img src={process.env.PUBLIC_URL + capa} alt={titulo} className={styles.capa} />
        <h2>{titulo}</h2>
      </Link>
      <div className={styles.actions}>
        <img
          src={iconBorrar}
          alt="Icono borrar"
          className={styles.icon}
          onClick={handleBorrar}
        />
        <img
          src={iconEditar}
          alt="Icono editar"
          className={styles.icon}
          onClick={handleEditar}
        />
      </div>
    </div>
  );
}

export default Card;
