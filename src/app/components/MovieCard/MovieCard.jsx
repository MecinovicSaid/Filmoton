// src/app/components/MovieCard/MovieCard.jsx
"use client";
import { useState } from 'react';
import Link from 'next/link';

const GENRE_MAP = {
    28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
    80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
    14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
    9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV Movie",
    53: "Thriller", 10752: "War", 37: "Western"
};

export default function MovieCard({ id, title, rating, imageUrl,genreIds}) {
    // Stanje kojim pratimo da li je miš iznad kartice
    const [isHovered, setIsHovered] = useState(false);

    const cardBg = 'var(--card-bg, rgba(17, 34, 64, 0.9))';
    const textMain = 'var(--text-main, #ccd6f6)';
    const accentColor = 'var(--accent, #64ffda)';

    const movieGenres = genreIds
        ?.map(id => GENRE_MAP[id])
            .filter(name => name)
            .slice(0,2)
            .join(" • ")


    return (
        <Link href={`/movie/${id}`} style={{ textDecoration: 'none' }}>
            <div
                style={{
                    width: '100%',
                    aspectRatio: '2/3',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // "Elastic" prelaz
                    boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.6)' : '0 10px 20px rgba(0,0,0,0.3)',
                    transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/*  POSTER */}
                <img
                    src={imageUrl}
                    alt={title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)', // Blago zumiranje slike
                    }}
                />

                {/* info window */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',

                    background: 'linear-gradient(to top, rgba(10, 25, 47, 0.98) 0%, rgba(10, 25, 47, 0.8) 60%, transparent 100%)',
                    backdropFilter: 'blur(12px)',
                    padding: '30px 15px 20px 15px',
                    borderRadius: '20px 20px 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,

                    // Animacija
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(110%)',
                }}>
                    {/* Title */}
                    <h3 style={{
                        color: '#fff',
                        margin: '0 0 12px 0',
                        fontSize: '1rem',
                        fontWeight: '600',
                        textAlign: 'center',
                        width: '100%',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        {title}
                    </h3>

                    {/* Rating */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: 'rgba(100, 255, 218, 0.1)',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        border: '1px solid #64ffda',
                    }}>
                        <span style={{ fontSize: '0.9rem' }}>⭐</span>
                        <span style={{
                            color: '#64ffda',
                            fontSize: '0.9rem',
                            fontWeight: 'bold'
                        }}>
                            {rating ? rating.toFixed(1) : "N/A"}
                        </span>
                    </div>
                    {movieGenres && (
                        <span
                        style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: '0.8rem',
                            fontWeight: '500',
                            marginTop: '5px'
                        }}>
                            {movieGenres}
                        </span>
                    )}

                </div>
            </div>
        </Link>
    );
}