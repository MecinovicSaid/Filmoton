"use client"

import {useState, useEffect} from 'react'
import {getTopRatedMovies} from "@/lib/tmdb";
import { getMovies  } from '@/lib/tmdb';
import MovieCard from "@/app/components/MovieCard/MovieCard";
import NavBar from "@/app/components/NavBar/NavBar";
import MovieRow from "@/app/components/MovieRow";
import  GenreCards from "@/app/components/Genre/GenreCards";

const genreList = [
    { id: 28, name: 'Action', color: 'rgba(229, 9, 20, 0.8)', image: 'https://image.tmdb.org/t/p/w500/8Y766967mS99vFEun9SAs69S99S.jpg' },
    { id: 35, name: 'Comedy', color: 'rgba(241, 196, 15, 0.8)', image: 'https://image.tmdb.org/t/p/w500/776S0p9NfS99vFEun9SAs69S99S.jpg' },
    { id: 27, name: 'Horror', color: 'rgba(139, 0, 0, 0.8)', image: 'https://image.tmdb.org/t/p/w500/5m99vFEun9SAs69S99S8Y766967.jpg' },
    { id: 878, name: 'Sci-Fi', color: 'rgba(75, 0, 130, 0.8)', image: 'https://image.tmdb.org/t/p/w500/rAiYStatus9SAs69S99S8Y766967.jpg' },
    { id: 10749, name: 'Romance', color: 'rgba(255, 105, 180, 0.8)', image: 'https://image.tmdb.org/t/p/w500/vogYStatus9SAs69S99S8Y766967.jpg' },
    { id: 53, name: 'Thriller', color: 'rgba(44, 62, 80, 0.8)', image: 'https://image.tmdb.org/t/p/w500/nMK9SAs69S99S8Y766967vFEun.jpg' }
];

export default  function HomePage() {
    const [topRated,setTopRated] = useState([]);
    const [trending, setTrending] = useState([]);
    const [searchResults, setSearchResults] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAllData () {
        try {
            const [trendingData,topRatedData] = await Promise.all([
                getMovies(),
                getTopRatedMovies()
            ])
            setTopRated(topRatedData);
            setTrending(trendingData);
        }
        catch (error) {
            console.log('warning',error);
        }
        finally {
            setLoading(false);
        }
    }
    fetchAllData();
        },[])


    if (loading) return <div style={{ color: '#64ffda', textAlign: 'center', marginTop: '50px' }}>Učitavanje bioskopa...</div>;

    return (
        <>

            <NavBar setMovies={setSearchResults} initialMovies={null} />

            <main style={{ padding: '40px 20px', backgroundColor: '#0a192f', minHeight: '100vh' }}>

                {/* logic: if you search (grid),if not (row). */}
                {searchResults ? (
                    <div>
                        <h1 style={{ color: '#64ffda', textAlign: 'center', marginBottom: '40px' }}>Rezultati pretrage</h1>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '25px'
                        }}>
                            {searchResults.length > 0 ? (
                                searchResults.map(movie => (
                                    <MovieCard
                                        key={movie.id}
                                        id={movie.id}
                                        title={movie.title}
                                        rating={movie.vote_average}
                                        imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    />
                                ))
                            ) : (
                                <h2 style={{ color: '#64ffda', textAlign: 'center', gridColumn: '1/-1' }}>Nema rezultata 😕</h2>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        {/* 1. row: Trending */}
                        <MovieRow title="Trending Now" movies={trending} />

                        {/* 2. roww            : Top Rated */}
                        <MovieRow title="Top Rated Shows" movies={topRated} />
                    </>
                )}

                <section style={{ marginTop: '60px', paddingBottom: '40px' }}>
                    <h2 style={{ color: '#64ffda', marginBottom: '25px', paddingLeft: '15px', fontSize: '1.8rem' }}>
                        Browse by Genre
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', // Malo šire kartice
                        gap: '25px',
                        padding: '0 15px'
                    }}>
                        {genreList.map(genre => (
                            <GenreCards
                                key={genre.id}
                                id={genre.id}
                                name={genre.name}
                                color={genre.color}
                                image={genre.image}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
