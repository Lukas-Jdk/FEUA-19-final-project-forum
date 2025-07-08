import styles from './Header.module.css';
import NavBar from './NavBar';
import UserMenu from './UserMenu';

const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.container}>
          <div className={styles.Logo}>ForumApp</div>
          <NavBar />
          <UserMenu />
      </div>
    </div>
  )
}

export default Header