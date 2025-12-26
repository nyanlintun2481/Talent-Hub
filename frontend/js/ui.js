// js/ui.js

// --- Funciones de Estado ---
export function mostrarLoader() {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.remove('hidden');
}

export function ocultarLoader() {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
}

export function mostrarMensajeVacio(mostrar) {
    const emptyMessage = document.getElementById('emptyMessage');
    if (emptyMessage) emptyMessage.classList.toggle('hidden', !mostrar);
}

export function limpiarPerfiles() {
    const container = document.getElementById('profilesContainer');
    if (container) container.innerHTML = '';
}

// --- Render de Perfiles ---
export function renderizarPerfiles(perfiles, onEditar, onEliminar) {
    limpiarPerfiles();
    const container = document.getElementById('profilesContainer');
    if (!container) return; // Si no hay contenedor, no hacemos nada

    if (!perfiles || perfiles.length === 0) {
        mostrarMensajeVacio(true);
        return;
    }

    mostrarMensajeVacio(false);

    // Verificar si el usuario está logueado para mostrar botones
    const esAdmin = !!localStorage.getItem('token');

    perfiles.forEach(perfil => {
        const card = document.createElement('div');
        card.className = 'bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1';

        card.innerHTML = `
            <div class="p-5">
                <div class="flex items-center space-x-4">
                    <img class="h-12 w-12 rounded-full border-2 border-blue-500" src="${perfil.avatar}" alt="Avatar">
                    <div>
                        <h3 class="text-lg font-bold text-white">${perfil.name}</h3>
                        <p class="text-gray-400 text-sm">${perfil.title}</p>
                    </div>
                </div>
                <div class="mt-4 flex gap-2">
                    <span class="bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded-md font-semibold">${perfil.category}</span>
                    <span class="bg-amber-900 text-amber-200 text-xs px-2 py-1 rounded-md font-semibold">${perfil.seniority}</span>
                </div>
            </div>
            <footer class="flex border-t border-gray-700 ${!esAdmin ? 'hidden' : ''}">
                <button data-editar class="flex-1 py-3 text-sm font-medium text-blue-400 hover:bg-gray-700 transition-colors border-r border-gray-700">
                    <i class="fas fa-edit mr-1"></i> Editar
                </button>
                <button data-eliminar class="flex-1 py-3 text-sm font-medium text-red-400 hover:bg-gray-700 transition-colors">
                    <i class="fas fa-trash mr-1"></i> Eliminar
                </button>
            </footer>
        `;

        if (esAdmin) {
            card.querySelector('[data-editar]').onclick = () => onEditar(perfil);
            card.querySelector('[data-eliminar]').onclick = () => onEliminar(perfil._id || perfil.id);
        }

        container.appendChild(card);
    });
}

// --- Lógica de Temas ---
export function setupTheme() {
    const themeBtn = document.getElementById('themeToggle');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('bg-gray-900');
        document.body.classList.toggle('bg-gray-100');
        document.body.classList.toggle('text-gray-100');
        document.body.classList.toggle('text-gray-900');
    });
}