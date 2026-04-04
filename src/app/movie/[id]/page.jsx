import { getMovieDetails, getMovieVideos } from "@/lib/tmdb";
import TrailerModal from "@/app/components/TrailerModal";
import Link from "next/link"; // Uvozimo Link za logo

const mainBtnStyle = {
    padding: '14px 30px',
    backgroundColor: '#64ffda',
    color: '#0a192f',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
};

const outlineBtnStyle = {
    padding: '14px 20px',
    backgroundColor: 'transparent',
    color: '#64ffda',
    border: '1px solid #64ffda',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
};

export default async function MovieDetails({ params }) {
    const { id } = await params;
    const movie = await getMovieDetails(id);
    const videoKey = await getMovieVideos(id);

    if (!movie) return <div style={{ color: 'white', padding: '50px' }}>Film was not found.</div>;

    return (
        <>
            {/* PRILAGOĐENA NAVIGACIJA SA LINKOM */}
            <nav style={{
                padding: '20px 40px',
                background: '#0a192f',
                borderBottom: '1px solid #112240',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <h1 style={{
                        margin: 0,
                        fontSize: '1.5rem',
                        color: '#64ffda',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        MOVIE<span style={{ color: '#ccd6f6' }}>HUB</span>
                    </h1>
                </Link>

                {/* Opciono: Možeš dodati Login/Signup dugmiće ovde da bi bilo simetrično */}
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button style={{ background: 'none', border: 'none', color: '#ccd6f6', cursor: 'pointer' }}>Login</button>
                    <button style={{ background: '#64ffda', border: 'none', color: '#0a192f', padding: '8px 15px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>Sign Up</button>
                </div>
            </nav>

            <main style={{
                padding: '40px',
                display: 'flex',
                gap: '60px', // Malo veći razmak za bolji pregled
                backgroundColor: '#0a192f',
                minHeight: '100vh',
                color: '#ccd6f6'
            }}>
                {/* Poster Filma */}
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    style={{
                        borderRadius: '15px',
                        width: '350px',
                        height: 'fit-content',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
                        border: '1px solid rgba(100, 255, 218, 0.1)'
                    }}
                />

                <div style={{ maxWidth: '800px' }}>
                    <h1 style={{ color: '#64ffda', fontSize: '3.5rem', margin: '0 0 10px 0', lineHeight: '1.1' }}>
                        {movie.title}
                    </h1>

                    <p style={{
                        fontSize: '1.2rem',
                        fontStyle: 'italic',
                        color: '#8892b0',
                        marginBottom: '25px',
                        letterSpacing: '0.5px'
                    }}>
                        {movie.tagline || "No tagline available"}
                    </p>

                    <div style={{ marginBottom: '30px', display: 'flex', gap: '25px', fontSize: '1.1rem' }}>
                        <span style={{ color: '#64ffda' }}>
                            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                        </span>
                        <span>📅 {movie.release_date?.split('-')[0]}</span> {/* Samo godina */}
                        <span>⏱️ {movie.runtime} min</span>
                    </div>

                    {/* Kontejner za akcije */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '15px',
                        marginBottom: '40px',
                        alignItems: 'center'
                    }}>
                        <button style={mainBtnStyle}>▶️ Watch Now</button>

                        {/* Tvoj novi Modal Trailer */}
                        <TrailerModal trailerKey={videoKey} />

                        <button style={outlineBtnStyle}>🔖 Save</button>
                        <button style={outlineBtnStyle}>❤️ Like</button>
                    </div>

                    <h3 style={{ color: '#64ffda', borderBottom: '1px solid #112240', paddingBottom: '10px', marginBottom: '15px' }}>
                        Storyline
                    </h3>
                    <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#a8b2d1' }}>
                        {movie.overview}
                    </p>
                </div>
            </main>
        </>
    );
}