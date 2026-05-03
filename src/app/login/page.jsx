'use client';
import { useState } from 'react';
import NavBar from '@/app/components/NavBar/NavBar';
import Link from 'next/link';


export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Pokušaj prijave sa:", formData);
        // Ovde ćemo kasnije ubaciti login logiku (npr. NextAuth)
    };

    return (
        <div style={{ backgroundColor: '#0a192f', minHeight: '100vh', color: 'white' }}>
            {/* NavBar bez props-ova automatski sklanja search bar */}
            <NavBar />

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '120px'
            }}>
                <form onSubmit={handleSubmit} style={{
                    backgroundColor: '#112240',
                    padding: '40px',
                    borderRadius: '15px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    width: '100%',
                    maxWidth: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '25px'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: '#64ffda', margin: '0 0 10px 0' }}>Welcome Back</h2>
                        <p style={{ color: '#ccd6f6', fontSize: '0.9rem' }}>Please enter your details</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.85rem', color: '#64ffda' }}>Email Address</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label style={{ fontSize: '0.85rem', color: '#64ffda' }}>Password</label>
                            <Link href="#" style={{ fontSize: '0.75rem', color: '#64ffda', textDecoration: 'none' }}>Forgot?</Link>
                        </div>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <button type="submit" style={buttonStyle}>
                        Log In
                    </button>

                    <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#ccd6f6' }}>
                        Don't have an account? <Link href="/signup" style={{ color: '#64ffda', textDecoration: 'none' }}>Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

// Stilovi (identični kao na Signup-u radi konzistentnosti)
const inputStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #233554',
    backgroundColor: '#0a192f',
    color: 'white',
    outline: 'none',
    fontSize: '1rem',
};

const buttonStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#64ffda',
    color: '#0a192f',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease'
};