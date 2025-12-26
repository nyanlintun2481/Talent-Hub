import { obtenerPerfiles, login } from './api.js';
import { renderizarPerfiles, mostrarLoader, ocultarLoader, setupTheme } from './ui.js';
import { aplicarFiltros, limpiarFiltros, registrarEventosFiltros } from './filtros.js';
import { abrirModalNuevo, abrirModalEditar, borrarPerfil } from './crud.js';

// Usamos una función para capturar elementos de forma segura
const getEl = (id) => document.getElementById(id);

document.addEventListener('DOMContentLoaded', async () => {
    // CAPTURA DENTRO DEL EVENTO
    const addProfileBtn = getEl('addProfileBtn');
    const clearFiltersBtn = getEl('clearFilters');
    const openLoginBtn = getEl('openLoginBtn');
    const logoutBtn = getEl('logoutBtn');
    const loginModal = getEl('loginModal');
    const doLoginBtn = getEl('doLogin');

    let perfiles = [];

    // =====================
    // GESTIÓN DE AUTH (ULTRA SEGURA)
    // =====================
    function verificarAutenticacion() {
        const token = localStorage.getItem('token');
        
        // El uso de ?. previene el error aunque el elemento no exista
        addProfileBtn?.classList.toggle('hidden', !token);
        logoutBtn?.classList.toggle('hidden', !token);
        
        // El login se oculta si hay token
        openLoginBtn?.classList.toggle('hidden', !!token);
    }

    // =====================
    // EVENTOS Y LÓGICA
    // =====================
    async function cargarPerfiles() {
        try {
            mostrarLoader();
            perfiles = await obtenerPerfiles();
            actualizarVista();
        } catch (error) {
            console.error("Error al conectar:", error.message);
        } finally {
            ocultarLoader();
        }
    }

    function actualizarVista() {
        const perfilesFiltrados = aplicarFiltros(perfiles);
        renderizarPerfiles(
            perfilesFiltrados,
            perfil => abrirModalEditar(perfil, cargarPerfiles),
            id => borrarPerfil(id, cargarPerfiles)
        );
    }

    // REGISTRO DE EVENTOS CON "?"
    addProfileBtn?.addEventListener('click', () => abrirModalNuevo(cargarPerfiles));
    
    // --- LÓGICA AGREGADA PARA LIMPIAR ---
    clearFiltersBtn?.addEventListener('click', () => {
        console.log("Limpiando filtros...");
        limpiarFiltros();   // 1. Borra el texto de los inputs (en filtros.js)
        actualizarVista();  // 2. Refresca la lista para mostrar todos
    });
    // ------------------------------------

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
            localStorage.setItem('token', data.token);
            location.reload(); 
        } catch (err) { alert(err.message); }
    });

    logoutBtn?.addEventListener('click', () => {
        localStorage.removeItem('token');
        location.reload();
    });

    // INICIO
    setupTheme();
    verificarAutenticacion();
    await cargarPerfiles();
    registrarEventosFiltros(actualizarVista);
});