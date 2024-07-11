import { Link } from 'react-router-dom';
import styles from './Cabecera.module.css';
import logo from './LogoAluraflix.png';
import CabeceraLink from './CabeceraLink';

function Cabecera() {
  return (
    <header className={styles.cabecera}>
      <Link to="/">
        <section className={styles.logoContainer}>
          <img src={logo} alt="Logo Alura" />
        </section>
      </Link>
      <nav>
        <CabeceraLink url="/">Home</CabeceraLink>
        <CabeceraLink url="/nuevo-video">Nuevo Video</CabeceraLink>
      </nav>
    </header>
  );
}

export default Cabecera;
