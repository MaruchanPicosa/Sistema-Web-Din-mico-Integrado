// Selección de elementos
const btnAgregar = document.getElementById('btnAgregar');
const inputTarea = document.getElementById('nuevaTarea');
const lista = document.getElementById('listaTareas');
const titulo = document.getElementById('titulo');

function agregarTarea() {
    const texto = inputTarea.value.trim();
    if (!texto) return;

    const li = document.createElement('li');
    const span = document.createElement('span');
    const btnDel = document.createElement('button');

    span.textContent = texto;
    btnDel.textContent = '✕';
    btnDel.className = 'btn-eliminar';

    btnDel.addEventListener('click', () => li.remove());
    span.addEventListener('click', () => {
        li.classList.toggle('completada');
    });

    li.appendChild(span);
    li.appendChild(btnDel);
    lista.appendChild(li);

    inputTarea.value = '';
    inputTarea.focus();
}

btnAgregar.addEventListener('click', agregarTarea);
inputTarea.addEventListener('keyup', e => {
    if (e.key === 'Enter') agregarTarea();
});

// Cambio de color al hacer doble clic
const colores = ['#1F3864', '#2E5FA3', '#E8A020', '#27AE60'];
let colorIdx = 0;

titulo.addEventListener('dblclick', () => {
    colorIdx = (colorIdx + 1) % colores.length;
    titulo.style.color = colores[colorIdx];
});

// MutationObserver para contar tareas
function actualizarContador() {
    const total = lista.querySelectorAll('li').length;
    titulo.setAttribute('data-count', total);
    titulo.textContent = `Mi Lista de Tareas (${total})`;
}

const observer = new MutationObserver(actualizarContador);
observer.observe(lista, { childList: true });