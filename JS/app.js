import { options } from "./Options.js";
document.querySelector(".buscar").addEventListener("click", (e) => {
    e.preventDefault();
    const buscar = document.getElementById('inputFormulario').value;
    const url = `https://watchmode.p.rapidapi.com/autocomplete-search/?search_value=${buscar}&search_type=1`;
    const fetchData = async () => {
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            // console.log(data); // Solicitamos los datos de la API
            const resultadosBusqueda = data.results
            obtenerID(resultadosBusqueda)
        } catch (error) {
            console.error(error);
        }
    }
    fetchData()
});
function obtenerID(resultadosBusqueda) {
    let carta = "";
    for (let i = 0; i < resultadosBusqueda.length; i++) {
        const ID = resultadosBusqueda[i].id;
        const url_info_detallada = `https://watchmode.p.rapidapi.com/title/${ID}/details/?language=ES`;
        const fetchData = async () => {
            try {
                const response = await fetch(url_info_detallada, options)
                const data = await response.json();
                // console.log(data); // obtenemos la info detallada de todos los resultados
                const poster = data.poster
                const titulo = data.title
                const tipo = data.type
                const estreno = data.release_date
                const generos = data.genre_names
                const calificacion = data.user_rating
                carta += /*HTML*/`
                <div class="imagen__inversor">
                    <div class="face front">
                        <img class="simon__borrero__imagen" src="${poster}" alt="">
                        <h3>${titulo}</h3>
                    </div>
                    <div class="face back">
                        <h3>${titulo}</h3>
                        <p>${estreno}</p>
                        <p>${generos}</p>
                        <p>${calificacion}</p>
                        <div class="link">
                            <a class="link-carta" href="">ver</a>
                        </div>
                    </div>
                </div>
                `;
            } catch (error) {
            }
            // console.log(carta);
            document.querySelector('.inversores').innerHTML = carta;
        };
        fetchData();
    }
}

