'use client'
import styles from './NavBar.module.css';
import { useState, useEffect } from "react";
import { searchMovies } from "@/lib/tmdb";
import {usePathname} from "next/navigation";
import Link from "next/link";

function NavBar({ setMovies, initialMovies }) {
    const [searchTerm, setSearchTerm] = useState("");
    const pathname = usePathname();


    useEffect(() => {
        if (typeof setMovies !== 'function') return;


        if (searchTerm.trim() === '') {

            setMovies(initialMovies);
            return;
        }

        const delay = setTimeout(async () => {
            if (searchTerm.length > 2) {
                const results = await searchMovies(searchTerm);
                if (results) {
                    setMovies(results);
                }
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [searchTerm, setMovies, initialMovies]);

    return (
        <nav className={styles.navBar}>
            <div className={styles.logo}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <h1 style={{ cursor: 'pointer', margin: 0, fontSize: '1.5rem', color: '#64ffda', fontWeight: 'bold' }}>
                        MOVIE<span style={{ color: '#ccd6f6' }}>HUB</span>
                    </h1>
                </Link>
            </div>


            {typeof setMovies === 'function' && (
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Pretraži filmove..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            )}

            <div className={styles.navButtons}>
                {pathname !== "/savedmovies"  &&  (
                <Link href='/savedmovies'> <button className={styles.btnSignup}>Saved Movies </button></Link>
                ) }
                {pathname !== '/login' && (
                <Link href="/login"><button className={styles.btnLogin}>Login</button></Link>
                    )}
                {pathname !== '/signup' && (
                <Link href="/signup"><button className={styles.btnSignup}>Sign Up</button></Link>
                    )}
                </div>

        </nav>
    );
}


export default NavBar;