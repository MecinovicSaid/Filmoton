'use client';
import { useState } from 'react';
import NavBar from '@/app/components/NavBar/NavBar';
import Link from 'next/link';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Podaci za registraciju:", formData);
        // Ovde ćemo kasnije povezati backend
    };

    return (
        <div style={{ backgroundColor: '#0a192f', minHeight: '100vh', color: 'white' }}>
            <NavBar />

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '100px'
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
                    gap: '20px'
                }}>
                    <h2 style={{ color: '#64ffda', textAlign: 'center', margin: '0 0 10px 0' }}>Create Account</h2>
                    <p style={{ color: '#ccd6f6', textAlign: 'center', fontSize: '0.9rem', marginBottom: '10px' }}>
                        Join MovieHub and save your favorites!
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.85rem', color: '#64ffda' }}>Username</label>
                        <input
                            name="username"
                            type="text"
                            placeholder="johndoe"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.85rem', color: '#64ffda' }}>Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="example@mail.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.85rem', color: '#64ffda' }}>Password</label>
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
                        Sign Up
                    </button>

                    <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#ccd6f6', marginTop: '10px' }}>
                        Already have an account? <Link href="/login" style={{ color: '#64ffda', textDecoration: 'none' }}>Log In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

// STILOVI (Možeš ih prebaciti i u CSS modul kasnije)
const inputStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #233554',
    backgroundColor: '#0a192f',
    color: 'white',
    outline: 'none',
    fontSize: '1rem',
    transition: 'border 0.3s ease',
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
    marginTop: '10px',
    transition: 'transform 0.2s ease, opacity 0.2s ease'
};