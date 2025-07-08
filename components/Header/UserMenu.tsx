import styles from "./UserMenu.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const UserMenu = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };
  return (
    <div>
      <nav>
        <ul className={styles.navList}>
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default UserMenu;
