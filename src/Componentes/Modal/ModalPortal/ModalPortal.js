// ModalPortal.js

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './../Modal.module.css';

const modalRoot = document.getElementById('modal-root');

function ModalPortal({ children }) {
  const el = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  return ReactDOM.createPortal(
    <div className={`${styles.modalBackdrop} ${styles.displayBlock}`}>
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {children}
          </div>
        </div>
      </div>
    </div>,
    el
  );
}

export default ModalPortal;
