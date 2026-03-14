// --- SISTEMA DE TABS ---
class TabComponent {
    constructor(contenedor) {
        this.tabs = contenedor.querySelectorAll('[data-tab]');
        this.paneles = document.querySelectorAll('[data-panel]');
        this.init();
    }
    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.activar(tab.dataset.tab));
        });
        const ultima = localStorage.getItem('tab-activa') || this.tabs[0].dataset.tab;
        this.activar(ultima);
    }
    activar(tabId) {
        this.tabs.forEach(t => t.classList.toggle('activo', t.dataset.tab === tabId));
        this.paneles.forEach(p => p.classList.toggle('activo', p.dataset.panel === tabId));
        localStorage.setItem('tab-activa', tabId);
    }
}
document.querySelectorAll('.tabs-container').forEach(c => new TabComponent(c));

// --- ACORDEÓN ---
document.querySelectorAll('.mi-acordeon').forEach(acordeon => {
    acordeon.querySelectorAll('.acordeon-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const cuerpo = item.querySelector('.acordeon-cuerpo');
            const abierto = item.classList.contains('abierto');

            acordeon.querySelectorAll('.acordeon-item').forEach(i => {
                i.classList.remove('abierto');
                i.querySelector('.acordeon-cuerpo').style.maxHeight = null;
            });

            if (!abierto) {
                item.classList.add('abierto');
                cuerpo.style.maxHeight = cuerpo.scrollHeight + 'px';
            }
        });
    });
});

// --- MODAL ---
class Modal {
    constructor(id) {
        this.modal = document.getElementById(id);
        if(!this.modal) return;
        this.overlay = this.modal.querySelector('.modal-overlay');
        this.cerrarBtn = this.modal.querySelector('.modal-cerrar');
        this.bindEventos();
    }
    bindEventos() {
        this.cerrarBtn.addEventListener('click', () => this.ocultar());
        this.overlay.addEventListener('click', () => this.ocultar());
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') this.ocultar();
        });
    }
    mostrar(titulo, contenido) {
        this.modal.querySelector('.modal-titulo').textContent = titulo;
        this.modal.querySelector('.modal-cuerpo').innerHTML = contenido;
        this.modal.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }
    ocultar() {
        this.modal.classList.remove('visible');
        document.body.style.overflow = '';
    }
}
const miModal = new Modal('modal-principal');
document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
        miModal.mostrar(btn.dataset.titulo, btn.dataset.contenido);
    });
});

// --- CARRUSEL AUTOMÁTICO ---
class Carrusel {
    constructor(selector, intervalo = 3000) {
        const contenedor = document.querySelector(selector);
        if(!contenedor) return;
        this.slides = contenedor.querySelectorAll('.slide');
        this.actual = 0;
        this.intervalo = intervalo;
        this.timer = null;
        this.contenedor = contenedor;
        this.init();
    }
    init() {
        this.mostrar(0);
        this.iniciarAuto();
        this.contenedor.addEventListener('mouseenter', () => this.detenerAuto());
        this.contenedor.addEventListener('mouseleave', () => this.iniciarAuto());
    }
    mostrar(indice) {
        this.slides.forEach((s, i) => {
            s.classList.toggle('activo', i === indice);
        });
        this.actual = indice;
    }
    siguiente() {
        this.mostrar((this.actual + 1) % this.slides.length);
    }
    iniciarAuto() { 
        this.timer = setInterval(() => this.siguiente(), this.intervalo); 
    }
    detenerAuto() { 
        clearInterval(this.timer); 
    }
}
new Carrusel('.mi-carrusel', 3500);