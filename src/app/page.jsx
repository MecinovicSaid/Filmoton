"use client"

import {useState, useEffect} from 'react'
import {getTopRatedMovies} from "@/lib/tmdb";
import { getMovies  } from '@/lib/tmdb';
import MovieCard from "@/app/components/MovieCard/MovieCard";
import NavBar from "@/app/components/NavBar/NavBar";
import MovieRow from "@/app/components/MovieRow";

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
            {/* NavBar-u šaljemo setSearchResults. Kada kucaš u search, on puni to stanje */}
            <NavBar setMovies={setSearchResults} initialMovies={null} />

            <main style={{ padding: '40px 20px', backgroundColor: '#0a192f', minHeight: '100vh' }}>

                {/* LOGIKA ZA PRIKAZ: Ako korisnik pretražuje, prikaži grid. Ako ne, prikaži redove. */}
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
                        {/* 1. Red: Trending */}
                        <MovieRow title="Trending Now" movies={trending} />

                        {/* 2. Red: Top Rated */}
                        <MovieRow title="Top Rated Shows" movies={topRated} />
                    </>
                )}
            </main>
        </>
    );
}