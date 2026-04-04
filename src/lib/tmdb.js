// src/lib/tmdb.js


const TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN;

console.log("TEST - Token length:", TOKEN ? TOKEN.length : "STILL UNDEFINED");


export async function getMovies() {
    // 2. Ovde unutar funkcije kreiramo options - SADA ĆE VIDETI TOKEN!
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`
        }
    };

    try {
        const res = await fetch('https://api.themoviedb.org/3/discover/movie?language=en-ENG&sort_by=popularity.desc', options);
        if (!res.ok) {
            console.error(`TMDB warning: ${res.status}`);
            return [];
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

    // 3. I ovde ga ubaci unutra
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`
        }
    };

    try {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-ENG&page=1`, options);
        if (!res.ok) return [];
        const data = await res.json();
        return data.results;
    } catch (err) {
        return [];
    }
}

export async function getMovieDetails(id) {
    // 4. I ovde isto
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`
        }
    };

    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-ENG`, options);
        if (!res.ok) return null;
        return await res.json();
    } catch (err) {
        return null;
    }
}