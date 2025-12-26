import { crearPerfil, actualizarPerfil, eliminarPerfil } from './api.js';
import { mostrarLoader, ocultarLoader } from './ui.js';

// ==========================================
// ELEMENTOS DEL DOM
// ==========================================
const modal = document.getElementById('profileModal');
const modalTitle = document.getElementById('modalTitle');
const saveBtn = document.getElementById('saveProfile');

// Inputs del Formulario
const profileIdInput = document.getElementById('profileId');
const nameInput = document.getElementById('nameInput');
const titleInput = document.getElementById('titleInput');
const categoryInput = document.getElementById('categoryInput');
const seniorityInput = document.getElementById('seniorityInput');
const avatarInput = document.getElementById('avatarInput');

let onSuccessCallback = null;

// ==========================================
// FUNCIONES DEL MODAL
// ==========================================

export function abrirModalNuevo(onSuccess) {
  onSuccessCallback = onSuccess;
  if (modalTitle) modalTitle.textContent = 'Nuevo Perfil';
  
  // Limpiar inputs
  if (profileIdInput) profileIdInput.value = '';
  [nameInput, titleInput, avatarInput].forEach(input => {
    if (input) input.value = '';
  });

  // Mostrar modal (Tailwind)
  modal?.classList.remove('hidden');
  modal?.classList.add('flex');
}

export function abrirModalEditar(perfil, onSuccess) {
  onSuccessCallback = onSuccess;
  if (modalTitle) modalTitle.textContent = 'Editar Perfil';

  // Llenar datos (MongoDB usa _id)
  if (profileIdInput) profileIdInput.value = perfil._id || perfil.id;
  if (nameInput) nameInput.value = perfil.name || '';
  if (titleInput) titleInput.value = perfil.title || '';
  if (categoryInput) categoryInput.value = perfil.category || '';
  if (seniorityInput) seniorityInput.value = perfil.seniority || '';
  if (avatarInput) avatarInput.value = perfil.avatar || '';

  modal?.classList.remove('hidden');
  modal?.classList.add('flex');
}

export function cerrarModal() {
  modal?.classList.add('hidden');
  modal?.classList.remove('flex');
}

// ==========================================
// LÓGICA CRUD
// ==========================================

async function guardarPerfil() {
  // 1. Validar que los elementos existen
  if (!nameInput || !titleInput) return;

  // 2. Crear objeto del perfil
  const perfil = {
    name: nameInput.value.trim(),
    title: titleInput.value.trim(),
    category: categoryInput.value,
    seniority: seniorityInput.value,
    avatar: avatarInput.value.trim() || 'https://i.pravatar.cc/150'
  };

  // 3. Validación simple
  if (!perfil.name || !perfil.title) {
    alert("Por favor, completa los campos obligatorios.");
    return;
  }

  try {
    mostrarLoader();
    const id = profileIdInput.value;

    if (id) {
      await actualizarPerfil(id, perfil);
    } else {
      await crearPerfil(perfil);
    }

    cerrarModal();
    if (onSuccessCallback) onSuccessCallback(); // Recarga la lista en el main.js
  } catch (error) {
    alert("Error al guardar: " + error.message);
  } finally {
    ocultarLoader();
  }
}

export async function borrarPerfil(id, onSuccess) {
  if (!confirm('¿Estás seguro de que deseas eliminar este perfil?')) return;

  try {
    mostrarLoader();
    await eliminarPerfil(id);
    if (onSuccess) onSuccess();
  } catch (error) {
    alert("Error al eliminar: " + error.message);
  } finally {
    ocultarLoader();
  }
}

// ==========================================
// INICIALIZACIÓN DE EVENTOS (SEGURO)
// ==========================================

// Usamos el operador ? para que si el elemento no existe, no tire error
saveBtn?.addEventListener('click', guardarPerfil);

// Cerramos el modal con cualquier botón que tenga la clase 'close-modal'
const closeButtons = modal?.querySelectorAll('.close-modal');
closeButtons?.forEach(btn => {
  btn.addEventListener('click', cerrarModal);
});