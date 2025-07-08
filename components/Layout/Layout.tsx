import styles from './Layout.module.css';
import Header from '../Header/Header';

const Layout = ({children} : {children: React.ReactNode}) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>© 2025 ForumApp</footer>

    </div>
  )
}

export default Layout