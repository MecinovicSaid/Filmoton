"use client"
import { useState, useEffect } from "react";
import NavBar from "@/app/components/NavBar/NavBar";
import MovieCard from "@/app/components/MovieCard/MovieCard";
import Link from "next/link";

export default function SavedMovies() {
    const [savedFilms, setSavedFilms] = useState([]);

    useEffect(() => {
        const moviesData = JSON.parse(localStorage.getItem('watchlist') || '[]');
        setSavedFilms(moviesData);
    }, []);


    const removeMovie = (id) => {
        const updated = savedFilms.filter(movie => movie.id !== id);
        setSavedFilms(updated);
        localStorage.setItem('watchlist', JSON.stringify(updated));
    };

    return (
        <div style={{
            background: '#0a192f',
            minHeight: '100vh',
            color: '#ccd6f6',
            fontFamily: 'sans-serif'
        }}>

            <NavBar />

            <main style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '40px 20px'
            }}>
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '40px',
                    borderBottom: '1px solid #112240',
                    paddingBottom: '20px'
                }}>
                    <h1 style={{ color: '#64ffda', margin: 0 }}>Moja Lista</h1>
                    <span style={{ color: '#8892b0' }}>{savedFilms.length} Sačuvanih</span>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '30px'
                }}>
                    {savedFilms.length > 0 ? (
                        savedFilms.map(movie => (
                            <div key={movie.id} style={{ position: 'relative' }}>
                                {/* Dugme za uklanjanje filma */}
                                <button
                                    onClick={() => removeMovie(movie.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        zIndex: 10,
                                        background: 'rgba(255, 77, 77, 0.9)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '30px',
                                        height: '30px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
                                    }}
                                >
                                    ✕
                                </button>

                                <MovieCard
                                    id={movie.id}
                                    title={movie.title}
                                    rating={movie.vote_average}
                                    imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    genreIds={movie.genre_ids}
                                />
                            </div>
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '50px' }}>
                            <p style={{ fontSize: '1.2rem', color: '#8892b0' }}>
                                Još uvek nemaš sačuvanih filmova.
                            </p>
                            <Link href="/">
                                <button style={{
                                    marginTop: '20px',
                                    padding: '10px 20px',
                                    backgroundColor: 'transparent',
                                    border: '1px solid #64ffda',
                                    color: '#64ffda',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}>
                                    Istraži filmove
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}