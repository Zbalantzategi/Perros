export class Perro {
    constructor(id, nombre, descripcion, hipoalergenico,vida, peso) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.hipoalergenico = hipoalergenico;
        this.vida = vida;
        this.peso = peso;
    }

    formatearRango(objetoRango) {
        return `${objetoRango.min} - ${objetoRango.max}`;
    }

    calculoMedia(objetoRango) {
        var media = objetoRango.min + objetoRango.max /2;
        return media;
    }

}