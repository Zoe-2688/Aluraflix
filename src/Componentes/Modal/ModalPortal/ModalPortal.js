import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './../Modal.module.css';

const modalRoot = document.getElementById('modal-root');

function ModalPortal({ children }) {
  const elRef = useRef(document.createElement('div'));

  useEffect(() => {
    const el = elRef.current;
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, []);

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
    elRef.current
  );
}

export default ModalPortal;
