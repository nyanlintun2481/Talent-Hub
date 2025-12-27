// crud.js
import { crearPerfil, actualizarPerfil, eliminarPerfil } from './api.js';
import { mostrarLoader, ocultarLoader } from './ui.js';

// ==========================================
// ELEMENTOS DEL DOM
// ==========================================
const modal = document.getElementById('profileModal');
const modalTitle = document.getElementById('modalTitle');
const saveBtn = document.getElementById('saveProfile');

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

  [profileIdInput, nameInput, titleInput, categoryInput, seniorityInput, avatarInput].forEach(input => {
    if (input) input.value = '';
  });

  modal?.classList.remove('hidden');
  modal?.classList.add('flex');
}

export function abrirModalEditar(perfil, onSuccess) {
  onSuccessCallback = onSuccess;
  if (modalTitle) modalTitle.textContent = 'Editar Perfil';

  if (profileIdInput) profileIdInput.value = perfil._id || perfil.id;
  if (nameInput) nameInput.value = perfil.name || '';
  if (titleInput) titleInput.value = perfil.title || '';
  if (categoryInput) categoryInput.value = perfil.category?._id || perfil.category || '';
  if (seniorityInput) seniorityInput.value = perfil.level?._id || perfil.level || '';
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
  if (!nameInput || !titleInput || !categoryInput || !seniorityInput) return;

  const perfil = {
    name: nameInput.value.trim(),
    title: titleInput.value.trim(),
    category: categoryInput.value.trim(),
    level: seniorityInput.value.trim(),
    avatar: avatarInput.value.trim() || 'https://i.pravatar.cc/150'
  };

  if (!perfil.name || !perfil.title || !perfil.category || !perfil.level) {
    alert("Por favor, completa todos los campos obligatorios.");
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
    if (onSuccessCallback) onSuccessCallback();
  } catch (error) {
    console.error("Error CRUD:", error);
    alert("Error al guardar perfil: " + (error.message || error));
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
    console.error("Error al eliminar:", error);
    alert("Error al eliminar perfil: " + (error.message || error));
  } finally {
    ocultarLoader();
  }
}

// ==========================================
// EVENTOS
// ==========================================
saveBtn?.addEventListener('click', guardarPerfil);

const closeButtons = modal?.querySelectorAll('.close-modal');
closeButtons?.forEach(btn => btn.addEventListener('click', cerrarModal));
