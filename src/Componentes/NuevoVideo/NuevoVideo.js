import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NuevoVideo.module.css';

function NuevoVideo() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!title || !category || !image || !video || !description) {
      alert('Todos los campos son obligatorios');
      return;
    }
    
    // Aquí podrías realizar la llamada fetch o axios para enviar los datos al servidor
    const formData = {
      title,
      category,
      image,
      video,
      description,
    };

    fetch('url_del_servidor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al enviar los datos al servidor');
      }
      return response.json();
    })
    .then(data => {
      console.log('Datos enviados correctamente:', data);
      // Aquí podrías manejar la respuesta del servidor, como actualizar el estado o redirigir a otra página
    })
    .catch(error => {
      console.error('Error en el envío de datos:', error);
      // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
    });
  };

  const handleClear = () => {
    setTitle('');
    setCategory('');
    setImage('');
    setVideo('');
    setDescription('');
    setIsSubmitted(false);
  };

  return (
    <div className={styles.container}>
      <h2>Nuevo Video</h2>
      <p>Complete el formulario para crear una nueva tarjeta de video.</p>
      <h3>Crear Tarjeta</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="titulo" className={styles.label}>Título:</label>
            <input
              type="text"
              id="titulo"
              className={`${styles.input} ${isSubmitted && !title && styles.error}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ingrese el título"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="categoria" className={styles.label}>Categoría:</label>
            <select
              id="categoria"
              className={`${styles.input} ${isSubmitted && !category && styles.error}`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Seleccione una categoría</option>
              <option value="FRONT END">Front End</option>
              <option value="BACK END">Back End</option>
              <option value="INNOVACION Y GESTION">Innovación y Gestión</option>
              <option value="CONSEJOS">Consejos</option>
            </select>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="img" className={styles.label}>Imagen (URL):</label>
            <input
              type="text"
              id="img"
              className={`${styles.input} ${isSubmitted && !image && styles.error}`}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Ingrese el enlace de la imagen"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="link" className={styles.label}>Video (URL):</label>
            <input
              type="text"
              id="link"
              className={`${styles.input} ${isSubmitted && !video && styles.error}`}
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              placeholder="Ingrese el enlace del video"
            />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <span className={styles.descriptionLabel}>Descripción:</span>
          </label>
          <textarea
            id="description"
            className={`${styles.input} ${isSubmitted && !description && styles.error}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="¿De qué se trata el video?"
          ></textarea>
        </div>
        <div className={styles.buttons}>
          <button type="submit" className={`${styles.button} ${styles.saveButton}`}>Guardar</button>
          <button type="button" onClick={handleClear} className={styles.button}>Limpiar</button>
        </div>
      </form>
    </div>
  );
}

export default NuevoVideo;
