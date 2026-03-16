"use client";
import styles from './NavBar.module.css'; // Importuješ stilove kao objekat

function NavBar() {
    return (
        <nav className={styles.navBar}>
        <div className={styles.logo}>
        <h1>MOVIE<span>HUB</span></h1>
    </div>


    <div className={styles.searchContainer}>
        <input type="text" placeholder="Pretraži filmove..." className={styles.searchInput} />
    </div>

    <div className={styles.navButtons}>
        <button className={styles.btnLogin}>Login</button>
        <button className={styles.btnSignup}>Sign Up</button>
    </div>
</nav>
    );
}

export default NavBar;