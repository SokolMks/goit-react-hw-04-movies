import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={styles.nav_item}
        activeClassName={styles.activeNavLink}
        exact
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={styles.nav_item}
        activeClassName={styles.activeNavLink}
      >
        Movie
      </NavLink>
    </nav>
  );
};

export default Navigation;