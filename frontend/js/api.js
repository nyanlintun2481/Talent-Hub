const BASE_URL = 'https://talent-hub-7cgj.onrender.com/api';

export async function obtenerPerfiles() {
  const res = await fetch(`${BASE_URL}/perfiles`);
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function crearPerfil(perfil) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/perfiles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(perfil)
  });
  return res.json();
}
