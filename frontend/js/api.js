// api.js
const BASE_URL = 'https://talent-hub-0n2p.onrender.com/api';

async function fetchJson(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

// PERFILES
export async function obtenerPerfiles() {
  return fetchJson(`${BASE_URL}/perfiles`);
}

export async function login(email, password) {
  return fetchJson(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
}

export async function crearPerfil(perfil) {
  const token = localStorage.getItem('token');
  return fetchJson(`${BASE_URL}/perfiles`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(perfil)
  });
}

export async function actualizarPerfil(id, perfil) {
  const token = localStorage.getItem('token');
  return fetchJson(`${BASE_URL}/perfiles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(perfil)
  });
}

export async function eliminarPerfil(id) {
  const token = localStorage.getItem('token');
  return fetchJson(`${BASE_URL}/perfiles/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
}

// CATEGORÍAS
export async function obtenerCategorias() {
  const data = await fetchJson(`${BASE_URL}/categories`); // <-- ruta correcta
  return data.categories || [];
}

// NIVELES
export async function obtenerLevels() {
  const data = await fetchJson(`${BASE_URL}/levels`);
  return data.levels || [];
}
