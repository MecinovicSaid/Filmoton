'use client'
import styles from './NavBar.module.css';
import {useState,useEffect} from "react"; // Importuješ stilove kao objekat
import {searchMovies} from "@/lib/tmdb";

function NavBar({setMovies,initialMovies,} ) {

    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        if (searchTerm.trim() === '') {
            setMovies(initialMovies);
            return;
        }
        const delay = setTimeout(async () => {
            if (searchTerm.length > 2) {
                const results = await searchMovies(searchTerm);
                setMovies(results);
            }
        }, 500);
        return () => clearTimeout(delay);
    }, [searchTerm, setMovies, initialMovies]);

    return (
        <nav className={styles.navBar}>
        <div className={styles.logo}>
        <h1>MOVIE<span>HUB</span></h1>
    </div>


    <div className={styles.searchContainer}>
        <input type="text" placeholder="Pretraži filmove..." className={styles.searchInput}
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}/>
    </div>

    <div className={styles.navButtons}>
        <button className={styles.btnLogin}>Login</button>
        <button className={styles.btnSignup}>Sign Up</button>
    </div>
</nav>
    );
}

export default NavBar;