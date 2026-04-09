// src/app/components/MovieCard/MovieCard.jsx
"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function MovieCard({ id, title, rating, imageUrl }) {
    // Stanje kojim pratimo da li je miš iznad kartice
    const [isHovered, setIsHovered] = useState(false);

    const cardBg = 'var(--card-bg, rgba(17, 34, 64, 0.9))';
    const textMain = 'var(--text-main, #ccd6f6)';
    const accentColor = 'var(--accent, #64ffda)';

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
                {/* 🖼️ POSTER */}
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

                {/* 📝 NOVI I LEPŠI INFO PROZORČIĆ */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    // Koristimo preliv od crne ka providnoj za "bioskopski" efekat
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
                    {/* Naslov filma */}
                    <h3 style={{
                        color: '#fff', // Čisto bela za bolji kontrast na mračnom
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

                    {/* Rejting "Kapsula" */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: 'rgba(100, 255, 218, 0.1)', // Vrlo bledo tirkizna pozadina
                        padding: '5px 12px',
                        borderRadius: '20px',
                        border: '1px solid #64ffda', // Tanka tirkizna ivica
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
                </div>
            </div>
        </Link>
    );
}