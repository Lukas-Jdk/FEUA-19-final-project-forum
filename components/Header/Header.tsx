import styles from "./Header.module.css";
import NavBar from "./NavBar";
import UserMenu from "./UserMenu";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          qForum
        </Link>

        <div className={styles.dekstopMenu}>
          <NavBar />
        </div>

        <div className={styles.usermenu}>
          <UserMenu />
        </div>



        <button
          className={styles.burger}
          onClick={() => setShowMenu(!showMenu)}
        >
          ☰
        </button>

        {showMenu && (
          <div className={styles.mobileMenu}>
            <NavBar />
             <UserMenu />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
