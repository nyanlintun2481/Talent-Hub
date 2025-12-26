const BASE_URL = 'https://talent-hub-0n2p.onrender.com/api';


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

// FUNCIONES QUE FALTABAN
export async function actualizarPerfil(id, perfil) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/perfiles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(perfil)
  });
  return res.json();
}

export async function eliminarPerfil(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/perfiles/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}
