import React, { useState, useEffect } from 'react';
import ModalPortal from './ModalPortal/ModalPortal';
import styles from './Modal.module.css';

function Modal({ show, handleClose, handleSave, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    video: '',
    description: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        category: initialData.category || '',
        image: initialData.image || '',
        video: initialData.video || '',
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!formData.title || !formData.category || !formData.image || !formData.video || !formData.description) {
      alert('Todos los campos son obligatorios');
      return;
    }

    handleSave(formData);
  };

  const handleClear = () => {
    setFormData({
      title: '',
      category: '',
      image: '',
      video: '',
      description: '',
    });
    setIsSubmitted(false);
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
                name="title"
                className={`${styles.input} ${isSubmitted && !formData.title ? styles.error : ''}`}
                value={formData.title}
                onChange={handleChange}
                placeholder="Ingrese el título"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="categoria" className={styles.label}>Categoría:</label>
              <select
                id="categoria"
                name="category"
                className={`${styles.input} ${styles.categoryInput} ${isSubmitted && !formData.category ? styles.error : ''}`}
                value={formData.category}
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
                name="image"
                className={`${styles.input} ${isSubmitted && !formData.image ? styles.error : ''}`}
                value={formData.image}
                onChange={handleChange}
                placeholder="Ingrese el enlace de la imagen"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="link" className={styles.label}>Video (URL):</label>
              <input
                type="text"
                id="link"
                name="video"
                className={`${styles.input} ${isSubmitted && !formData.video ? styles.error : ''}`}
                value={formData.video}
                onChange={handleChange}
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
              name="description"
              className={`${styles.input} ${isSubmitted && !formData.description ? styles.error : ''}`}
              value={formData.description}
              onChange={handleChange}
              placeholder="¿De qué se trata el video?"
              rows={4} // Número inicial de filas, puedes ajustar según sea necesario
            ></textarea>
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
