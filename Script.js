// Usando uma API Key pública de exemplo (TMDB permite uso educacional)
const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=ace2c20ba6353d4891157978d38865f1&language=pt-BR&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

async function getMovies() {
    const movieGrid = document.getElementById('movie-grid');
    
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        movieGrid.innerHTML = ""; // Limpa o loading

        data.results.slice(0, 10).forEach(movie => {
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie-card');
            
            movieEl.innerHTML = `
                <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <span class="rating">★ ${movie.vote_average}</span>
                </div>
            `;
            movieGrid.appendChild(movieEl);
        });
    } catch (error) {
        movieGrid.innerHTML = "<p>Erro ao carregar filmes. Tente novamente.</p>";
    }
}

getMovies();