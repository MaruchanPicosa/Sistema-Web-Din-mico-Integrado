// Importamos funciones del archivo api.js (Flask resuelve esta ruta estática)
import { obtenerUsuarios, obtenerPostsDeUsuario } from './api.js';

const contenedor = document.getElementById('contenedor-usuarios');
const spinner = document.getElementById('spinner');
const estado = document.getElementById('estado');

function mostrarEstado(msg, tipo = 'info') {
    estado.textContent = msg;
    estado.className = `estado-${tipo}`;
}

function renderizarTarjeta(usuario) {
    const card = document.createElement('article');
    card.className = 'tarjeta-usuario';
    card.innerHTML = `
        <h3>${usuario.name}</h3>
        <p>📧 ${usuario.email}</p>
        <p>🌐 ${usuario.website}</p>
        <button class='btn-posts' data-id='${usuario.id}'>Ver publicaciones</button>
        <div class='posts-container' hidden></div>
    `;

    card.querySelector('.btn-posts').addEventListener('click', async (e) => {
        const postsDiv = card.querySelector('.posts-container');
        const btn = e.target;
        
        if (!postsDiv.hidden) {
            postsDiv.hidden = true;
            btn.textContent = 'Ver publicaciones';
            return;
        }

        postsDiv.hidden = false;
        postsDiv.innerHTML = '<em>Cargando posts...</em>';
        btn.textContent = 'Ocultar publicaciones';

        try {
            const posts = await obtenerPostsDeUsuario(usuario.id);
            postsDiv.innerHTML = posts.slice(0, 3)
                .map(p => `<p><strong>• ${p.title}</strong></p>`)
                .join('');
        } catch (err) {
            postsDiv.innerHTML = `<span style="color: red;">Error: ${err.message}</span>`;
        }
    });
    return card;
}

document.getElementById('btnCargar').addEventListener('click', async () => {
    spinner.hidden = false;
    contenedor.innerHTML = '';
    mostrarEstado('Solicitando datos al servidor...', 'info');
    
    try {
        const usuarios = await obtenerUsuarios();
        usuarios.forEach(u => contenedor.appendChild(renderizarTarjeta(u)));
        mostrarEstado(`${usuarios.length} usuarios cargados exitosamente.`, 'ok');
    } catch (err) {
        mostrarEstado(`Error al cargar: ${err.message}`, 'error');
    } finally {
        spinner.hidden = true;
    }
});

document.getElementById('busqueda').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('.tarjeta-usuario').forEach(card => {
        const nombre = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = nombre.includes(query) ? 'block' : 'none';
    });
});