'use client'
import Link from "next/link";

export default function GenreCards ({name,color,image,id}) {


    return (
        <Link href={`/genre/${id}`} style={{ textDecoration: 'none' }}>
            <div style={{
                height: '160px',
                borderRadius: '15px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
            }}
                 onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'scale(1.03) translateY(-5px)';
                     e.currentTarget.style.boxShadow = '0 12px 25px rgba(100, 255, 218, 0.2)';
                 }}
                 onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'scale(1) translateY(0)';
                     e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.4)';
                 }}
            >
                <img
                src={image}
                alt={name}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    filter:'brightness(0.6)',
                }}
                />
                {/* Overlay with grad*/}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(to top, ${color} 0%, rgba(10, 25, 47, 0.2) 100%)`,
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '20px',
                    backdropFilter: 'blur(1px)' // Blago zamućenje pozadine za premium izgled
                }}>
                    <h3 style={{
                        color: 'white',
                        margin: 0,
                        fontSize: '1.4rem',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        {name}
                    </h3>
                </div>
            </div>
        </Link>
    )

}