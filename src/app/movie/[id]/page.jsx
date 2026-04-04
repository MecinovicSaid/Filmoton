
'use client'
import getMovieDetails, {getMovies} from "@/lib/tmdb";
import NavBar from "@/app/components/NavBar";


const mainBtnStyle = {
    padding: '14px 30px',
    backgroundColor: '#64ffda',
    color: '#0a192f',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
};

const secondaryBtnStyle = {
    padding: '14px 30px',
    backgroundColor: '#112240',
    color: '#ccd6f6',
    border: '1px solid #233554',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
};

const outlineBtnStyle = {
    padding: '14px 20px',
    backgroundColor: 'transparent',
    color: '#64ffda',
    border: '1px solid #64ffda',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
};

export default async function MovieDetails({params}) {

    const {id} = await  params;
    const movie = await getMovieDetails(id);

if(!movie) return <div>Film was not found.</div>;


    console.log(movie);

    return (
        <>
            <nav style={{ padding: '20px', background: '#0a192f', borderBottom: '1px solid #112240' }}>
                <h2 style={{ color: '#64ffda' }}>MOVIEHUB</h2>
            </nav>

            <main style={{
                padding: '40px',
                display: 'flex',
                gap: '40px',
                backgroundColor: '#0a192f',
                minHeight: '100vh',
                color: '#ccd6f6'
            }}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    style={{ borderRadius: '15px', width: '350px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                />

                <div style={{ maxWidth: '800px' }}>
                    <h1 style={{ color: '#64ffda', fontSize: '3rem' }}>{movie.title}</h1>
                    <p style={{ fontStyle: 'italic', color: '#8892b0', marginBottom: '20px' }}>{movie.tagline}</p>
                    <div style={{ marginBottom: '20px' }}>
<span style={{ color: '#64ffda', marginRight: '20px' }}>
    ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "Nema ocene"}
</span>                        <span>📅 {movie.release_date}</span>
                    </div>
                    {/* Kontejner za dugmiće */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '15px',
                        marginTop: '30px'
                    }}>

                        {/* WATCH NOW - Glavna akcija */}
                        <button
                            style={mainBtnStyle}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 0 20px rgba(100, 255, 218, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            ▶️ Watch Now
                        </button>

                        {/* WATCH TRAILER - Otvara YouTube pretragu */}
                        <a
                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title)}+official+trailer`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ textDecoration: 'none' }}
                        >
                            <button style={secondaryBtnStyle}>🎬 Watch Trailer</button>
                        </a>

                        {/* SAVE - Watchlist */}
                        <button style={outlineBtnStyle}>🔖 Save</button>

                        {/* LIKE - Favoriti */}
                        <button style={outlineBtnStyle}>❤️ Like</button>
                    </div>
                    <h3>Opis:</h3>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>{movie.overview}</p>
                </div>
            </main>

        </>
    );
}