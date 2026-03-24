// app/layout.jsx
import NavBar from "@/app/components/NavBar";
import './globals.css';

export const metadata = {
    title: 'Movie App',
    description: 'Moja aplikacija za filmove',
};

export default function RootLayout({ children }) {
    return (
        <html lang="sr">
        <body style={{ backgroundColor: '#0a192f', color: '#ccd6f6', margin: 0 }}>
        < NavBar />
        <main>
            {children}
        </main>
        </body>
        </html>
    );
}