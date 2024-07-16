import React, { useState, useEffect } from 'react';
import ModalPortal from './ModalPortal/ModalPortal';
import styles from './Modal.module.css';

function Modal({ show, handleClose, handleSave, initialData }) {
  const [titulo, setTitle] = useState('');
  const [categoria, setCategory] = useState('');
  const [img, setImage] = useState('');
  const [link, setVideo] = useState('');
  const [descripcion, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [descriptionError, setDescriptionError] = useState('');

  useEffect(() => {
    if (initialData) {
      console.log(initialData)
      setTitle(initialData.titulo || '');
      setCategory(initialData.categoria || '');
      setImage(initialData.img || '');
      setVideo(initialData.link || '');
      setDescription(initialData.descripcion || '');
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(2)
    switch (name) {
      case 'titulo':
        setTitle(value);
        break;
      case 'categoria':
        setCategory(value);
        break;
      case 'img':
        setImage(value);
        break;
      case 'link':
        setVideo(value);
        break;
      case 'descripcion':
        if (value.length <= 300) {
          setDescription(value);
          setDescriptionError('');
        } else {
          setDescriptionError('La descripción no puede exceder los 300 caracteres.');
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!titulo || !categoria || !img || !link || !descripcion) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const formData = {
      id: initialData.id, // Asegúrate de incluir el ID del link que se está editando
      titulo,
      categoria,
      img,
      link,
      descripcion,
    };

    // Enviar solicitud PUT para actualizar los datos en el servidor
    fetch(`http://localhost:3001/videos/${initialData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo completar la solicitud');
        }
        console.log('Datos actualizados correctamente');
        // Actualizar el estado local o realizar alguna acción adicional si es necesario
        handleSave(formData); // Actualizar el estado local de la lista de videos
        setIsSubmitted(false); // Resetear isSubmitted después de guardar
        handleClose(); // Cerrar el modal después de guardar
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
        // Mostrar mensaje de error al usuario, por ejemplo:
        alert('Hubo un problema al guardar los cambios. Por favor, inténtalo de nuevo más tarde.');
      });
  };

  const handleClear = () => {
    setTitle('');
    setCategory('');
    setImage('');
    setVideo('');
    setDescription('');
    setIsSubmitted(false);
    setDescriptionError('');
  };

  if (!show) {
    return null;
  }

  return (
    <ModalPortal>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={handleClose}>&times;</span>
        <h2 className={styles.centerText}>Editar Video</h2>
        <p className={styles.centerText}>Complete el formulario para editar el video.</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="titulo" className={styles.label}>Título:</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                className={`${styles.input} ${isSubmitted && !titulo && styles.error}`}
                value={titulo}
                onChange={handleChange}
                placeholder="Ingrese el título"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="categoria" className={styles.label}>Categoría:</label>
              <select
                id="categoria"
                name="categoria"
                className={`${styles.input} ${styles.categoryInput} ${isSubmitted && !categoria && styles.error}`}
                value={categoria}
                onChange={handleChange}
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
                name="img"
                className={`${styles.input} ${isSubmitted && !img && styles.error}`}
                value={img}
                onChange={handleChange}
                placeholder="Ingrese el enlace de la imagen"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="link" className={styles.label}>Video (URL):</label>
              <input
                type="text"
                id="link"
                name="link"
                className={`${styles.input} ${isSubmitted && !link && styles.error}`}
                value={link}
                onChange={handleChange}
                placeholder="Ingrese el enlace del link"
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <span className={styles.descriptionLabel}>Descripción:</span>
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              className={`${styles.input} ${isSubmitted && !descripcion && styles.error}`}
              value={descripcion}
              onChange={handleChange}
              placeholder="¿De qué se trata el link?"
              rows={4}
            ></textarea>
            {descriptionError && <span className={styles.errorText}>{descriptionError}</span>}
            <span className={styles.wordCount}>{descripcion.length}/300 caracteres</span>
          </div>
          <div className={styles.buttons}>
            <button type="submit" className={`${styles.button} ${styles.saveButton}`}>Guardar</button>
            <button type="button" onClick={handleClear} className={styles.button}>Limpiar</button>
          </div>
        </form>
      </div>
    </ModalPortal>
  );
}

export default Modal;
