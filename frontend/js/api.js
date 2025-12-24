
const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : 'https://talent-hub-7cgj.onrender.com/api';

// Ahora tus constantes quedan cortas y limpias:
const API_URL = `${BASE_URL}/perfiles`;
const AUTH_URL = `${BASE_URL}/auth`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

export async function obtenerPerfiles() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener perfiles');
  return await response.json();
}

// Cambié el nombre a 'login' para que coincida con main.js
export async function login(email, password) {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  if (!response.ok) throw new Error(data.msg || 'Error en el login');
  return data;
}

export async function crearPerfil(perfil) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(perfil)
  });
  if (!response.ok) throw new Error('No autorizado o error al crear');
  return await response.json();
}

export async function actualizarPerfil(id, perfil) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(perfil)
  });
  if (!response.ok) throw new Error('Error al actualizar');
  return await response.json();
}

export async function eliminarPerfil(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Error al eliminar');
  return true;
}
