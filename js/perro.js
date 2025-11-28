import { peticionPerro } from "./service/ajax.js";

//Conseguir el id
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idPerro = urlParams.get('id');

const contenedorNombre = document.querySelector('.nombrePerro');
const contenedorDescripcion = document.querySelector('.descripcion');
const contenedorHipo = document.querySelector('.hipoalergenico');
const graficoVida = document.querySelector('.vida');
const graficoPeso = document.querySelector('.peso');




//Conseguir los contenedores en los que irá el contenido 

function iniciar() {
    if (idPerro) {
        peticionPerro(idPerro)
            .then(response => response.json())
            .then(json => {
                const atributos = json.data.attributes;
                const nombre = atributos.name;
                const descripcion = atributos.description;
                const esHipoalergenico = atributos.hypoallergenic;
                const vidaMin = atributos.life.min;
                const vidaMax = atributos.life.max;

                const pesoMin = atributos.male_weight.min;
                const pesoMax = atributos.male_weight.max;

                pintarPorPantalla(nombre, descripcion, esHipoalergenico, vidaMin, vidaMax, pesoMin, pesoMax);
            })
            .catch(error => console.log("No se han podido procesar los datos" + error))
    }
}

function pintarPorPantalla(nombre, descripcion, esHipoalergenico, vidaMin, vidaMax, pesoMin, pesoMax) {
    contenedorNombre.textContent = nombre;
    contenedorDescripcion.textContent = descripcion;
    if (esHipoalergenico) {
        contenedorHipo.textContent = "Este perro SÍ es hipoalergénico"

    } else {
        contenedorHipo.textContent = "Este perro NO es hipoalergénico"
    }

    //Crear gráficos
    const etiquetasVida = ['MIN vida', 'MAX vida'];
    const dataVida = [vidaMin, vidaMax];
    const etiquetasPeso = ['MIN peso', 'MAX peso'];
    const dataPeso = [pesoMin, pesoMax];
    crearGrafico(graficoVida, etiquetasVida, dataVida, 'Años');
    crearGrafico(graficoPeso, etiquetasPeso, dataPeso, 'Kg');



}

function crearGrafico(contenedor, etiquetas, data, leyenda) {
    new Chart(contenedor, {
        type: 'bar',
        data: {
            labels: etiquetas,
            datasets: [{
                label: leyenda,
                data: data,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    })
}



iniciar();