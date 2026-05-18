// Usando uma API Key pública de exemplo (TMDB permite uso educacional)
const API_URL =
'https://api.themoviedb.org/3/movie/popular?api_key=0d6b303089d3e71f104caf117dacdb5d&language=pt-BR&page=1';

const IMG_PATH =
'https://image.tmdb.org/t/p/w500';

async function getMovies() {

    const movieGrid =
    document.getElementById('movie-grid');

    try {

        const response =
        await fetch(API_URL);

        if (!response.ok) {

            throw new Error(
                `Erro HTTP: ${response.status}`
            );
        }

        const data =
        await response.json();

        movieGrid.innerHTML = '';

        data.results
        .slice(0, 10)
        .forEach(movie => {

            const movieEl =
            document.createElement('div');

            movieEl.classList.add('movie-card');

            const poster =
            movie.poster_path
            ? IMG_PATH + movie.poster_path
            : 'https://via.placeholder.com/500x750?text=Sem+Foto';

            movieEl.innerHTML = `

                <img
                    loading="lazy"
                    src="${poster}"
                    alt="${movie.title}"
                >

                <div class="movie-info">

                    <h3>${movie.title}</h3>

                    <span class="rating">
                        ★ ${movie.vote_average.toFixed(1)}
                    </span>

                </div>
            `;

            // Vibração (hardware)

            movieEl.addEventListener('click', () => {

                if (navigator.vibrate) {

                    navigator.vibrate(200);
                }

                alert(movie.title);
            });

            movieGrid.appendChild(movieEl);
        });

    } catch (error) {

        console.error(error);

        movieGrid.innerHTML = `

            <p style="padding:20px;">
                Erro ao carregar filmes.
                <br>
                ${error.message}
            </p>
        `;
    }
}

getMovies();


// REGISTRAR SERVICE WORKER

if ('serviceWorker' in navigator) {

    window.addEventListener('load', () => {

        navigator.serviceWorker

            .register('/service-worker.js')

            .then(() => {

                console.log(
                    'Service Worker registrado!'
                );
            })

            .catch(error => {

                console.log(
                    'Erro Service Worker:',
                    error
                );
            });
    });
}
