"use client"

import {useState, useEffect} from 'react'
import { getMovies } from '@/lib/tmdb';
import MovieCard from './components/MovieCard/MovieCard';
import NavBar from "@/app/components/NavBar";

export default  function HomePage() {
    // Ovde povlačimo filmove sa API-ja
    const [movies, setMovies] = useState([]);
    const [initialMovies, setInitialMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchIinitialData () {
            try {
                const data = await getMovies();
                setMovies(data);
                setInitialMovies(data);
            } catch (error) {
                console.error('warning: ', error);
            } finally {
                setLoading(false);
            }
        }
        fetchIinitialData()
    },[])



    if (loading) return <div style={{ color: '#64ffda', textAlign: 'center', marginTop: '50px' }}>Učitavanje...</div>;

    return (
        <>

            <NavBar setMovies={setMovies} initialMovies={initialMovies} />

            <main style={{ padding: '20px' }}>
                <h1 style={{ color: '#64ffda', textAlign: 'center' }}>
                    {movies.length < 0 &&   movies.length < 20 ? "Rezultati pretrage" : "Top Films"}
                </h1>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '25px',
                    marginTop: '40px'
                }}>
                    {movies && movies.length > 0 ? (
                        movies.map(movie => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                rating={movie.vote_average}
                                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            />
                        ))
                    ) : (
                        //no results message //
                        <div style={{
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            marginTop: '80px',
                            padding: '40px',
                            backgroundColor: 'rgba(100, 255, 218, 0.05)',
                            borderRadius: '15px',
                            border: '1px dashed #64ffda'
                        }}>
                            <h2 style={{ color: '#64ffda' }}>No Results 😕</h2>
                            <p style={{ color: '#ccd6f6' }}>
                                Sorry, we can't find the movie you're looking for.
                                <br /> Make sure you typed the name correctly.

                            </p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}