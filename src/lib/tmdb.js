// src/lib/tmdb.js

import {headers} from "next/headers";

export async function getMovies() {
    //
    const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTc2MzFmZWI2OGFiNzQ2N2NmMWUzZjJmMThlOWIyMCIsIm5iZiI6MTc2MDk2NTY5My41NDksInN1YiI6IjY4ZjYzNDNkM2M2NzJkNzU4YmY1YzNmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AHaxz7nJnHfrV9o3bLgWiKyGJBhk-Kpd1z6ztIbYzMQ';

    const options = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        },


    };

    try {
        const res = await fetch('https://api.themoviedb.org/3/discover/movie?language=en-ENG&sort_by=popularity.desc', options);

        if (!res.ok) {
            // Ovo će ti u terminalu WebStorm-a ispisati tačan broj greške (npr. 401)
            console.error(`TMDB warning: ${res.status} ${res.statusText}`);
            throw new Error('Greška pri učitavanju sa TMDB servera');
        }

        const data = await res.json();
        return data.results;
    } catch (err) {
        console.error("Fetch error:", err);
        return [];
    }
}

export async function searchMovies(query) {
    if (!query) return [];

    const options =  {
        method: 'GET',
            headers: {
            accept: 'application/json',
                Authorization: `Bearer ${TOKEN}`

        }
    };

    try {
        const res = await fetch (`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=sr-RS&page=1`, options)
    if (!res.ok) return [];
    const data = await res.json()
        return data.results;
    }
    catch (err) {
        console.error("Fetch error:", err);
        return [];
    }

}