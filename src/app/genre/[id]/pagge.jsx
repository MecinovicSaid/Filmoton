// src/app/genre/[id]/pagge.jsx
import { getMoviesByGenre } from "@/lib/tmdb";
import MovieCard from "@/app/components/MovieCard/MovieCard";
import NavBar from "@/app/components/NavBar/NavBar"; // UVEZI NAVBAR

const GENRE_NAMES = {
    28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
    80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
    14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
    9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV Movie",
    53: "Thriller", 10752: "War", 37: "Western"
};

export default async function GenrePage({ params }) {
    const { id } = await params;
    const movies = await getMoviesByGenre(id);
    const currentGenreName = GENRE_NAMES[id] || "Movies";

    return (
        <>

            <NavBar />

            <main style={{ padding: '40px 20px', backgroundColor: '#0a192f', minHeight: '100vh' }}>

                <div style={{ textAlign: 'center', marginBottom: '50px', marginTop: '60px' }}>
                    <h1 style={{ color: '#64ffda', fontSize: '2.8rem', marginBottom: '10px', textTransform: 'uppercase' }}>
                        {currentGenreName}
                    </h1>
                    <div style={{
                        width: '80px',
                        height: '4px',
                        backgroundColor: '#64ffda',
                        margin: '10px auto',
                        borderRadius: '2px'
                    }}></div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '30px',
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    {movies && movies.length > 0 ? (
                        movies.map(movie => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                rating={movie.vote_average}
                                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                genreIds={movie.genre_ids}
                            />
                        ))
                    ) : (
                        <p style={{ color: 'white', gridColumn: '1/-1', textAlign: 'center' }}>
                            No movies found for this genre.
                        </p>
                    )}
                </div>
            </main>
        </>
    );
}