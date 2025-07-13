import styles from './NavBar.module.css';
import Link from 'next/link';

const NavBar = () => {
  return (
    <div>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/new-question">ASK QUESTIONS</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
