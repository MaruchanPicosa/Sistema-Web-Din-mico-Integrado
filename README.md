# 🚀 Proyecto Final: Sistema Web Dinámico Integrado

## 📝 Descripción
Este proyecto es el resultado de la integración de las Prácticas 1, 2 y 3 de la materia de Desarrollo Web Profesional. En lugar de presentar ejercicios aislados, decidí construir un **Proyecto Web Completo** montado sobre un servidor **Flask**. 

Utilicé un sistema de pestañas (Tabs) dinámico para unificar todas las herramientas en una sola página de demostración (Single Page Application).

## 🧩 Módulos Integrados
1. **Explorador DOM (Pestaña 1):** Un gestor de tareas interactivo que permite crear, marcar y eliminar nodos directamente del árbol DOM usando la API nativa de JS.
2. **Dashboard de Usuarios (Pestaña 2):** Un panel asíncrono que consume la API REST de JSONPlaceholder mediante Fetch y async/await, incluyendo una barra de búsqueda en tiempo real.
3. **Componentes UI Dinámicos (Pestaña 3):** Implementación orientada a objetos de componentes avanzados:
   - Acordeón con animaciones CSS/JS.
   - Modal interactivo con bloqueo de scroll.
   - Carrusel automático de imágenes.

## 🛠️ Tecnologías y Características
- **Backend:** Python + Flask (Soluciona problemas de CORS para los Módulos ES6).
- **Frontend:** HTML5, CSS3, JavaScript Vainilla (ES6).
- **Persistencia:** Uso de `localStorage` para recordar la última pestaña abierta por el usuario.

## ⚙️ Cómo ejecutar el proyecto
Debido a que el proyecto utiliza módulos asíncronos y partición de archivos, requiere ejecutarse en el servidor local.

1. Asegúrate de tener Python instalado.
2. Clona este repositorio y abre la terminal en la carpeta principal.
3. Instala Flask si no lo tienes: `pip install flask`
4. Levanta el servidor:
   ```bash
   python app.py
5. Abre tu navegador web en: http://127.0.0.1:5000/

## Desarrollado por Zaida Sofía Martínez Dircio