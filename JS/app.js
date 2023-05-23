import { options } from "./options.js";

document.querySelector(".buscar").addEventListener("click", (e) => {
    e.preventDefault();

    const buscar = document.getElementById('inputFormulario').value;
    const url = `https://watchmode.p.rapidapi.com/autocomplete-search/?search_value=${buscar}&search_type=1 `;
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
                /*
                    <div class="face front">
                        <img class="simon__borrero__imagen" src="https://i.pinimg.com/originals/2d/ca/2b/2dca2b63c24de470bda80a6b4dc40ad3.jpg" alt="">
                        <h3>Henrry Cavill</h3>
                    </div>
                    <div class="face back">
                        <h3>Henrry Cavill</h3>
                        <p><strong>VIEJO SABROSO, WuW!!!</strong></p>
                        <div class="link">
                            <a href="#">Detalles</a>
                        </div>
                    </div>
                */

                carta += /*HTML*/`
                <div class="face front">
                    <img class="simon__borrero__imagen" src="${poster}" alt="">
                    <h3></h3>
                </div>
                <div class="face back">
                    <h3>Henrry Cavill</h3>
                    <p><strong>VIEJO SABROSO, WuW!!!</strong></p>
                    <div class="link">
                        <a href="#">Detalles</a>
                    </div>
                </div>



                <div class="card-content">
                    <div class="card-img">
                        <img src="${poster}" alt="">
                    </div>
                    <div class="card-text">
                        <h3>Titulo: <span class="titulo">${titulo}</span></h3>
                        <p>Tipo: <span class="type">${tipo}</span></p>
                        <p>Estreno en el: <span class="estreno">${estreno}</span></p>
                        <p>Generos: <span class="generos">${generos}</span></p>
                        <p>Calificación: <span class="calificacion">${calificacion}</span></p>
                    </div>
                </div>
                `
            } catch (error) {
            }
            console.log(carta);
            document.querySelector('#contenido').innerHTML = carta;
        };
        fetchData();
    }
}
