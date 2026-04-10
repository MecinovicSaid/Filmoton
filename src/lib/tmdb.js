// src/lib/tmdb.js



const TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN;

console.log("TEST - Token length:", TOKEN ? TOKEN.length : "STILL UNDEFINED");


export async function getMovies() {
    
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

export  async function getMovieVideos (id) {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
        }
    }


    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-ENG`, options);
    const data = await res.json();
    const trailer =  data.results?.find(vid => vid.type === 'Trailer' && vid.site === 'YouTube');
    return trailer ? trailer.key : null
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getTopRatedMovies() {
    // DONT FORGETT//
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`
        }
    };

    try {
        const res = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
        if (!res.ok) {
            console.error(`TMDB Top Rated warning: ${res.status}`);
            return [];
        }
        const data = await res.json();
        return data.results;
    } catch (err) {
        console.error("Fetch Top Rated error:", err);
        return [];
    }
}
<<<<<<< HEAD


export async function getMoviesByGenre(genreId) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
        }
    };

    try {

        const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&sort_by=popularity.desc`,
            options
        );
        const data = await res.json();
        return data.results;
    } catch (err) {
        console.error(err);
        return [];
    }
}
=======
>>>>>>> 384dbd0a63c3597896925e66f1e8408f7c387340
