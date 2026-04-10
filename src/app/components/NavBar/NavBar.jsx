'use client'
import styles from './NavBar.module.css';
import { useState, useEffect } from "react";
import { searchMovies } from "@/lib/tmdb";
import Link from "next/link";

function NavBar({ setMovies = () => {}, initialMovies = [] }) {
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
                {/* LOGO JE SADA LINK KOJI VODI NA POCETNU */}
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <h1 style={{
                        cursor: 'pointer',
                        margin: 0,
                        fontSize: '1.5rem',
                        color: '#64ffda',
                        fontWeight: 'bold',
                        letterSpacing: '1px'
                    }}>
                        MOVIE<span style={{ color: '#ccd6f6' }}>HUB</span>
                    </h1>
                </Link>
            </div>

            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Pretraži filmove..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className={styles.navButtons}>
                <button className={styles.btnLogin}>Login</button>
                <button className={styles.btnSignup}>Sign Up</button>
            </div>
        </nav>
    );
}

export default NavBar;