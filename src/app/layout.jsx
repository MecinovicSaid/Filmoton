// app/layout.jsx

import NavBar from "@/app/components/NavBar/NavBar";
import './globals.css';

export const metadata = {
    title: 'Movie App',
    description: 'A simple movie app built with Next.js and TMDB API',
};

export default function RootLayout({ children }) {
    return (
        <html lang="sr">
        <body style={{ backgroundColor: '#0a192f', color: '#ccd6f6', margin: 0 }}>

        <main>
            {children}
        </main>
        </body>
        </html>
    );
}