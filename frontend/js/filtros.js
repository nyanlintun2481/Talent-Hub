// filtros.js
export function aplicarFiltros(perfiles) {
    if (!perfiles) return [];

    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const levelFilter = document.getElementById('seniorityFilter'); 

    if (!searchInput || !categoryFilter || !levelFilter) return perfiles;

    const texto = searchInput.value.toLowerCase();
    const categoria = categoryFilter.value;
    const nivel = levelFilter.value;

    return perfiles.filter(perfil => {
        const nombre = (perfil.name || '').toLowerCase();
        const titulo = (perfil.title || '').toLowerCase();

        const coincideTexto = nombre.includes(texto) || titulo.includes(texto);
        const coincideCategoria = categoria === '' || (perfil.category?._id === categoria);
        const coincideNivel = nivel === '' || (perfil.level?._id === nivel);

        return coincideTexto && coincideCategoria && coincideNivel;
    });
}

export function limpiarFiltros() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const levelFilter = document.getElementById('seniorityFilter');

    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (levelFilter) levelFilter.value = '';
}

export function registrarEventosFiltros(callback) {
    document.getElementById('searchInput')?.addEventListener('input', callback);
    document.getElementById('categoryFilter')?.addEventListener('change', callback);
    document.getElementById('seniorityFilter')?.addEventListener('change', callback);
}
