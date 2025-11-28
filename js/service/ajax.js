const API_URL = 'https://dogapi.dog/api/v2';

export function realizarPeticionPerros() {
    return fetch(API_URL + '/breeds');
}

export function peticionPerro(id) {
    return fetch(API_URL + '/breeds/' + id);
}