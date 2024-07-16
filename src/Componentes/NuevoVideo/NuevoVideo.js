import React, { useState } from 'react';
import styles from './NuevoVideo.module.css';
import { useNavigate } from 'react-router-dom';

const NuevoVideo = ({ addVideo, categorias }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Validación de campos
    if (!title || !category || !image || !video || !description) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const formData = {
      titulo: title,
      link: video,
      img: image,
      categoria: category,
    };

    // Simulación de envío de datos (POST request a json-server)
    fetch('http://localhost:3001/videos', {
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
        addVideo(data); // Agregar el nuevo video al estado local
        handleClear(); // Limpiar formulario después de enviar
        navigate('/'); // Redirigir al inicio después de agregar el video
      })
      
      .catch(error => {
        console.error('Error al enviar los datos:', error);
        // Manejar el error adecuadamente, mostrar mensaje al usuario, etc.
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
              {categorias.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
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
};

export default NuevoVideo;
