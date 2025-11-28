
import { Perro } from "./model/Perro.js";
import { realizarPeticionPerros } from "./service/ajax.js";


const contenedor = document.getElementById('contenedor');
const inputBusqueda = document.querySelector('.buscador input');
const botonesFiltro = document.querySelectorAll('.filtros-contenedor button');

const listaPerros = [];

function iniciar() {
    realizarPeticionPerros()
    .then(response => response.json())
    .then(json => {
        json.data.forEach(raza => {
            const nuevoPerro = crearPerro(raza);
            listaPerros.push(nuevoPerro);
        })

        maquetarPerros(listaPerros);
        activarFiltros();
        
    })
    .catch(error => {
        console.error('Error al realizar la petición:', error);
    });


}




function crearPerro(raza) {
    const attr = raza.attributes;

    const NuevoPerro = new Perro(
        raza.id,
        attr.name,
        attr.description,
        attr.hypoallergenic,
        attr.life,
        attr.male_weight
    )
    return NuevoPerro

}

function maquetarPerros(listaPerros) {
    if(contenedor) {
        contenedor.innerHTML = '';
        listaPerros.forEach(dog => {
            //Creamos el contenedor del perro y le asignamos la clase
            var divPerro = document.createElement('div');
            divPerro.classList.add('divPerro');

            //Creamos la p que contiene el nombre del perro
            var nombrePerro = dog.nombre;
            var contenedorNombrePerro = document.createElement('p');
            contenedorNombrePerro.textContent = nombrePerro;
            divPerro.appendChild(contenedorNombrePerro);

            //Creamos la p que contiene el peso medio del perro
            var pesoPerro = dog.calculoMedia(dog.peso);
            var contenedorPesoPerro = document.createElement('p');
            //Insertar imagen peso
            var contenedorImgPeso = document.createElement('img');
            contenedorImgPeso.src = '../../app/img/weight.svg';
            contenedorPesoPerro.appendChild(contenedorImgPeso);
            contenedorPesoPerro.classList.add('valores');
            var textoPeso = document.createTextNode(" " + pesoPerro + " kg");
            contenedorPesoPerro.appendChild(textoPeso)
            divPerro.appendChild(contenedorPesoPerro);

            //Creamos la p que contiene la media de vida del perro
            var mediaVida = dog.calculoMedia(dog.vida);
            var contenedorVidaPerro = document.createElement('p');
            //Insertar imagen corazon
            var contenedorImgVida = document.createElement('img');
            contenedorImgVida.src = '../../app/img/heart.svg';
            contenedorVidaPerro.appendChild(contenedorImgVida);
            contenedorVidaPerro.classList.add('valores');
            var textoVida = document.createTextNode(" " + mediaVida + " años");
            contenedorVidaPerro.appendChild(textoVida)
            divPerro.appendChild(contenedorVidaPerro);
            
            //Añadimos todo el divPerro al contenedor
            contenedor.appendChild(divPerro);

            divPerro.addEventListener('click', () => {
                window.location.href = `./perro.html?id=${dog.id}`;
            });
        });

    }else {
        console.log('No se han podido cargar los datos correctamente');
    }

}

function activarFiltros() {
    inputBusqueda.addEventListener('input', (evento) => {
        const textoBusqueda = evento.target.value.toLowerCase();

        const perrosFiltrados = listaPerros.filter(perro =>
            perro.nombre.toLowerCase().includes(textoBusqueda)
        );

        maquetarPerros(perrosFiltrados);
    })

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            const tipoFiltro = evento.target.textContent;
            let perrosFiltrados = [];

            if(tipoFiltro === "Todos") {
                perrosFiltrados = listaPerros;
            } else if (tipoFiltro === "Hypoalergénicos") {
                perrosFiltrados = listaPerros.filter(dog => dog.hipoalergenico === true);
            } else if (tipoFiltro === "Grandes") {
                perrosFiltrados = listaPerros.filter(dog => dog.calculoMedia(dog.peso) >= 25);
            } else if (tipoFiltro === "Pequeños") {
                perrosFiltrados = listaPerros.filter(dog => dog.calculoMedia(dog.peso) < 25)
            }

            maquetarPerros(perrosFiltrados);
        })
        
    })

}

iniciar();