"use client";
import { useState } from 'react';

export default function TrailerModal({ trailerKey }) {
    const [isOpen, setIsOpen] = useState(false);

    // Ako nema ključa, nećemo sakriti dugme (radi testa), nego ćemo ispisati poruku
    const handleOpen = () => {
        if (!trailerKey) {
            alert("Nažalost, trejler za ovaj film trenutno nije dostupan.");
            return;
        }
        setIsOpen(true);
    };

    return (
        <>
            {/* STILIZOVANO DUGME */}
            <button
                onClick={handleOpen}
                style={{
                    padding: '14px 30px',
                    backgroundColor: '#112240',
                    color: '#64ffda', // Tirkizna boja kao tvoj "Watch Now" akcenat
                    border: '1px solid #64ffda',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#112240';
                    e.target.style.transform = 'translateY(0)';
                }}
            >
                🎬 Watch Trailer
            </button>

            {/* MODAL (PROZORČIĆ) */}
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(2, 12, 27, 0.95)', // Jako tamno plava, skoro providna
                    backdropFilter: 'blur(8px)', // Zamagljuje pozadinu sajta
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    padding: '20px'
                }} onClick={() => setIsOpen(false)}>

                    <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '900px',
                        aspectRatio: '16/9',
                        backgroundColor: '#000',
                        borderRadius: '15px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                        border: '1px solid rgba(100, 255, 218, 0.2)',
                        overflow: 'hidden'
                    }} onClick={(e) => e.stopPropagation()}>

                        {/* DUGME ZA ZATVARANJE (X) */}
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '-45px',
                                right: '0',
                                background: 'none',
                                border: 'none',
                                color: '#64ffda',
                                fontSize: '2rem',
                                cursor: 'pointer',
                                fontWeight: 'light'
                            }}
                        >
                            ✕ Zatvori
                        </button>

                        {/* IFRAME ZA VIDEO */}
                        <iframe
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none'
                            }}
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
                            title="YouTube trailer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    );
}