"use client";
import { useRef, useEffect, useState } from "react";
import MovieCard from "./MovieCard/MovieCard";

export default function MovieRow({ title, movies }) {
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    // --- AUTO-SCROLL LOGIKA ---
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused && scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

                // Ako dođe do kraja, vrati se na početak, inače skroluj za širinu jedne kartice
                const maxScroll = scrollWidth - clientWidth;
                if (scrollLeft >= maxScroll - 10) {
                    scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
                }
            }
        }, 4000); // 5 sekundi

        return () => clearInterval(interval);
    }, [isPaused]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const amount = direction === "left" ? -500 : 500;
            scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
        }
    };

    return (
        <div
            style={{ marginBottom: '60px', position: 'relative' }}
            onMouseEnter={() => setIsPaused(true)}  // Pauziraj kad je miš tu
            onMouseLeave={() => setIsPaused(false)} // Nastavi kad miš ode
        >
            <h2 style={{
                color: '#64ffda',
                marginBottom: '20px',
                paddingLeft: '15px',
                fontSize: '1.8rem',
                letterSpacing: '1px'
            }}>
                {title}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', group: 'true' }}>
                {/* STRELICE - sada su malo lepše i vidljivije samo na hover */}
                <button onClick={() => scroll("left")} style={{ ...navBtnStyle, left: '10px' }}> ‹ </button>

                <div
                    ref={scrollRef}
                    style={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollBehavior: 'smooth',
                        gap: '20px',
                        padding: '20px 15px',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {movies && movies.map(movie => (
                        <div key={movie.id} style={{ minWidth: '240px' }}>
                            <MovieCard
                                id={movie.id}
                                title={movie.title}
                                rating={movie.vote_average}
                                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            />
                        </div>
                    ))}
                </div>

                <button onClick={() => scroll("right")} style={{ ...navBtnStyle, right: '10px' }}> › </button>
            </div>
        </div>
    );
}

const navBtnStyle = {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: 'rgba(10, 25, 47, 0.8)',
    color: '#64ffda',
    border: '1px solid #64ffda',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    fontSize: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 15px rgba(100, 255, 218, 0.2)',
};