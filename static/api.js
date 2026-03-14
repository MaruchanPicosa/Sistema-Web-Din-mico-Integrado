const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function obtenerUsuarios() {
    const respuesta = await fetch(`${BASE_URL}/users`);
    if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
    return await respuesta.json();
}

export async function obtenerPostsDeUsuario(userId) {
    const res = await fetch(`${BASE_URL}/posts?userId=${userId}`);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return await res.json();
}