// main.js
import { obtenerPerfiles, login } from './api.js';
import { renderizarPerfiles, mostrarLoader, ocultarLoader, setupTheme } from './ui.js';
import { aplicarFiltros, limpiarFiltros, registrarEventosFiltros } from './filtros.js';
import { abrirModalNuevo, abrirModalEditar, borrarPerfil } from './crud.js';

const getEl = (id) => document.getElementById(id);

document.addEventListener('DOMContentLoaded', async () => {
    const addProfileBtn = getEl('addProfileBtn');
    const clearFiltersBtn = getEl('clearFilters');
    const openLoginBtn = getEl('openLoginBtn');
    const logoutBtn = getEl('logoutBtn');
    const loginModal = getEl('loginModal');
    const doLoginBtn = getEl('doLogin');

    let perfiles = [];
    let usuarioRol = null; // guardamos el rol del usuario logueado

    function verificarAutenticacion() {
        const token = localStorage.getItem('token');
        usuarioRol = token ? JSON.parse(atob(token.split('.')[1])).role : null;
        addProfileBtn?.classList.toggle('hidden', usuarioRol !== 'admin');
        logoutBtn?.classList.toggle('hidden', !token);
        openLoginBtn?.classList.toggle('hidden', !!token);
    }

    async function cargarPerfiles() {
        try {
            mostrarLoader();
            perfiles = await obtenerPerfiles();
            actualizarVista();
        } catch (error) {
            console.error("Error al obtener perfiles:", error.message);
        } finally {
            ocultarLoader();
        }
    }

    function actualizarVista() {
        const perfilesFiltrados = aplicarFiltros(perfiles);
        renderizarPerfiles(
            perfilesFiltrados,
            usuarioRol === 'admin' ? perfil => abrirModalEditar(perfil, cargarPerfiles) : null,
            usuarioRol === 'admin' ? id => borrarPerfil(id, cargarPerfiles) : null
        );
    }

    // LOGIN
    openLoginBtn?.addEventListener('click', () => {
        loginModal?.classList.remove('hidden');
        loginModal?.classList.add('flex');
    });

    getEl('closeLogin')?.addEventListener('click', () => {
        loginModal?.classList.add('hidden');
        loginModal?.classList.remove('flex');
    });

    doLoginBtn?.addEventListener('click', async () => {
        const email = getEl('loginEmail')?.value;
        const pass = getEl('loginPass')?.value;
        try {
            const data = await login(email, pass);
            if (data.token) {
                localStorage.setItem('token', data.token);
                verificarAutenticacion();
                loginModal?.classList.add('hidden');
                await cargarPerfiles();
            } else {
                alert(data.msg || 'Error al iniciar sesión');
            }
        } catch (err) {
            alert("Error: " + err.message);
        }
    });

    logoutBtn?.addEventListener('click', () => {
        localStorage.removeItem('token');
        usuarioRol = null;
        location.reload();
    });

    // BOTON NUEVO PERFIL Y FILTROS
    addProfileBtn?.addEventListener('click', () => abrirModalNuevo(cargarPerfiles));
    clearFiltersBtn?.addEventListener('click', () => {
        limpiarFiltros();
        actualizarVista();
    });
    registrarEventosFiltros(actualizarVista);

    // INICIO
    setupTheme();
    verificarAutenticacion();
    await cargarPerfiles();
});
