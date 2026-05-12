const API_KEY = '0d6b303089d3e71f104caf117dacdb5d';

const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`;

const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

async function getMovies() {
    const movieGrid = document.getElementById('movie-grid');

    try {
        console.log("Tentando buscar filmes...");

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log("Dados recebidos:", data);

        movieGrid.innerHTML = "";

        if (data.results && data.results.length > 0) {

            data.results.slice(0, 12).forEach(movie => {

                const movieEl = document.createElement('div');
                movieEl.classList.add('movie-card');

                // Caso não tenha imagem
                const poster = movie.poster_path
                    ? IMG_PATH + movie.poster_path
                    : 'https://via.placeholder.com/500x750?text=Sem+Foto';

                movieEl.innerHTML = `
                    <img src="${poster}" alt="${movie.title}">
                    
                    <div class="movie-info">
                        <h3>${movie.title}</h3>

                        <span class="rating">
                            ★ ${movie.vote_average.toFixed(1)}
                        </span>
                    </div>
                `;

                movieGrid.appendChild(movieEl);
            });

        } else {

            movieGrid.innerHTML = `
                <p>Nenhum filme encontrado.</p>
            `;
        }

    } catch (error) {

        console.error("Erro detalhado:", error);

        movieGrid.innerHTML = `
            <p style="color: white; padding: 20px;">
                Erro ao carregar filmes.
                <br>
                <small>${error.message}</small>
            </p>
        `;
    }
}

getMovies();
