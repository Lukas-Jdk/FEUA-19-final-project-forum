import styles from './Header.module.css';
import NavBar from './NavBar';
import UserMenu from './UserMenu';
import Link from 'next/link'

const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.container}>
          <Link href="/" className={styles.logo}>qForum</Link>
          <NavBar />
          <UserMenu />
      </div>
    </div>
  )
}

export default Header