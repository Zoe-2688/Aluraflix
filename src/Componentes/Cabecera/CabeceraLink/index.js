import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CabeceraLink.module.css';

function CabeceraLink({ to, children }) {
  return (
    <Link to={to} className={styles.buttonLink}>
      {children}
    </Link>
  );
}

export default CabeceraLink;
