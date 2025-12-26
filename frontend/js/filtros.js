//============================
// Filtros para perfiles de usuarios (MERN Version)
//============================

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const seniorityFilter = document.getElementById('seniorityFilter');

export function aplicarFiltros(perfiles) {
  // Manejo de seguridad: si perfiles es undefined, devolvemos array vacío
  if (!perfiles) return [];

  const texto = searchInput.value.toLowerCase();
  const categoria = categoryFilter.value;
  const seniority = seniorityFilter.value;

  return perfiles.filter(perfil => {
    // Usamos encadenamiento opcional (?.) por si algún campo viene nulo de la DB
    const nombre = perfil.name?.toLowerCase() || '';
    const titulo = perfil.title?.toLowerCase() || '';

    const coincideTexto = nombre.includes(texto) || titulo.includes(texto);
    const coincideCategoria = categoria === '' || perfil.category === categoria;
    const coincideSeniority = seniority === '' || perfil.seniority === seniority;

    return coincideTexto && coincideCategoria && coincideSeniority;
  });
}

export function limpiarFiltros() {
  searchInput.value = '';
  categoryFilter.value = '';
  seniorityFilter.value = '';
}

export function registrarEventosFiltros(callback) {
  // 'input' es ideal para el buscador (tiempo real)
  searchInput.addEventListener('input', callback);
  // 'change' es mejor para los selects
  categoryFilter.addEventListener('change', callback);
  seniorityFilter.addEventListener('change', callback);
}