// main.js
import { obtenerPerfiles, login, obtenerCategorias, obtenerLevels } from './api.js';
import { renderizarPerfiles, mostrarLoader, ocultarLoader, setupTheme } from './ui.js';
import { aplicarFiltros, limpiarFiltros, registrarEventosFiltros } from './filtros.js';
import { abrirModalNuevo, abrirModalEditar, borrarPerfil } from './crud.js';

document.addEventListener('DOMContentLoaded', async () => {
    let perfiles = [];
    let role = localStorage.getItem('role') || 'user';
    let categorias = [];
    let niveles = [];

    // --- Tema ---
    const temaGuardado = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('bg-gray-900', temaGuardado === 'dark');
    document.body.classList.toggle('text-gray-100', temaGuardado === 'dark');

    // --- Cargar perfiles ---
    async function cargarPerfilesInicial() {
        try {
            mostrarLoader();
            perfiles = await obtenerPerfiles();
            actualizarVista();
        } catch (error) {
            console.error("Error al cargar perfiles:", error);
        } finally {
            ocultarLoader();
        }
    }

    // --- Actualizar vista ---
    function actualizarVista() {
        try {
            const perfilesFiltrados = aplicarFiltros(perfiles);
            renderizarPerfiles(
                perfilesFiltrados,
                perfil => role === 'admin' && abrirModalEditar(perfil, cargarPerfilesInicial),
                id => role === 'admin' && borrarPerfil(id, cargarPerfilesInicial)
            );
        } catch (e) {
            console.warn("Filtros fallidos, renderizando base:", e);
            renderizarPerfiles(perfiles);
        }
    }

    // --- Verificar auth ---
    function verificarAutenticacion() {
        const token = localStorage.getItem('token');
        role = localStorage.getItem('role') || 'user';

        document.getElementById('addProfileBtn')?.classList.toggle('hidden', role !== 'admin');
        document.getElementById('logoutBtn')?.classList.toggle('hidden', !token);
        document.getElementById('openLoginBtn')?.classList.toggle('hidden', !!token);
    }

    // --- Cargar categorías y niveles ---
    async function cargarOpciones() {
        try {
            categorias = await obtenerCategorias();
            niveles = await obtenerLevels();
        } catch (err) {
            console.error("Error al cargar categorías o niveles:", err);
            alert("No se pudieron cargar categorías o niveles. Verifica tu backend.");
        }
    }

    // --- Llenar selects en modal ---
    function llenarSelects() {
        const categorySelect = document.getElementById('categoryInput');
        const senioritySelect = document.getElementById('seniorityInput');

        if (categorySelect) {
            categorySelect.innerHTML = '<option value="">Seleccione...</option>' +
                categorias.map(cat => `<option value="${cat._id}">${cat.name}</option>`).join('');
        }

        if (senioritySelect) {
            senioritySelect.innerHTML = '<option value="">Seleccione...</option>' +
                niveles.map(niv => `<option value="${niv._id}">${niv.name}</option>`).join('');
        }
    }

    // --- Eventos login ---
    document.getElementById('openLoginBtn')?.addEventListener('click', () => {
        const modal = document.getElementById('loginModal');
        modal?.classList.remove('hidden');
        modal?.classList.add('flex');
    });

    document.getElementById('doLogin')?.addEventListener('click', async () => {
        const email = document.getElementById('loginEmail')?.value;
        const pass = document.getElementById('loginPass')?.value;

        if (!email || !pass) return alert("Completa los campos");

        try {
            const data = await login(email, pass);
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.user.role || 'user');
                verificarAutenticacion();
                document.getElementById('loginModal')?.classList.add('hidden');
                await cargarOpciones();
                await cargarPerfilesInicial();
            } else {
                alert(data.msg || "Credenciales incorrectas");
            }
        } catch (err) {
            alert("Error en el servidor");
        }
    });

    // --- Logout ---
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        role = 'user';
        verificarAutenticacion();
        actualizarVista();
    });

    // --- Nuevo perfil ---
    document.getElementById('addProfileBtn')?.addEventListener('click', () => {
        llenarSelects(); // <--- llenar selects antes de abrir modal
        abrirModalNuevo(cargarPerfilesInicial);
    });

    // --- Limpiar filtros ---
    document.getElementById('clearFilters')?.addEventListener('click', () => {
        limpiarFiltros();
        actualizarVista();
    });

    // --- Inicialización ---
    verificarAutenticacion();
    registrarEventosFiltros(actualizarVista);
    await cargarOpciones();
    await cargarPerfilesInicial();
    setupTheme();
});
