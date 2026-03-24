import { getMovies } from '@/lib/tmdb';
import MovieCard from './components/MovieCard/MovieCard';

export default async function HomePage() {
    // Ovde povlačimo filmove sa API-ja
    const movies = await getMovies();

    return (
        <main style={{ padding: '20px' }}>
            <h1 style={{ color: '#64ffda', textAlign: 'center' }}>Najpopularniji Filmovi</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '25px',
                marginTop: '40px'
            }}>
                {movies && movies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        rating={movie.vote_average}
                        imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    />
                ))}
            </div>
        </main>
    );
}