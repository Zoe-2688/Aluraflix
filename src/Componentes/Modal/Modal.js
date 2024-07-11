import React, { useState, useEffect } from 'react';
import './Modal.module.css';

const Modal = ({ show, onClose, data }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (data) {
      setTitle(data.titulo || '');
      setCategory(data.categoria || '');
      setImage(data.img || '');
      setVideo(data.link || '');
      setDescription(data.description || '');
    }
  }, [data]);

  const handleClear = () => {
    setTitle('');
    setCategory('');
    setImage('');
    setVideo('');
    setDescription('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el envío del formulario
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">X</button>
        <h2>Editar Video</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Título:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Categoría:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label>Imagen (URL):</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div>
            <label>Video (URL):</label>
            <input
              type="text"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
            />
          </div>
          <div>
            <label>Descripción:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="modal-buttons">
            <button type="submit">Guardar</button>
            <button type="button" onClick={handleClear}>Limpiar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
