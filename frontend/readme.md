# 🔍 IT Profile Finder & Management System
Aplicación web desarrollada en JavaScript Vanilla que permite gestionar perfiles tecnológicos (Tech Roles). El sistema cuenta con un sistema de Autenticación para proteger las operaciones de administración (CRUD), conectando un Frontend dinámico con un Backend en Node.js y MongoDB.

---

## 🚀 Demo

🔗 **Aplicación deployada:** [https://tu-deploy.vercel.app](https://tu-deploy.vercel.app)

---

## 🧠 Decisiones técnicas

 ```
Talent-Hub/
├── 📂frontend/             # Lógica del cliente
│   ├── 📂assets/           # Imágenes y recursos estáticos
│   ├── 📂css/              # Estilos (Tailwind / CSS)
│   ├── 📂js/               # Módulos de JavaScript
│   │   ├── api.js        # Servicios de conexión (Fetch)
│   │   ├── ui.js         # Manipulación del DOM
│   │   ├── filters.js    # Lógica de búsqueda
│   │   ├── crud.js       # Operaciones Crear/Editar/Borrar
│   │   └── main.js       # Orquestador principal
│   └── index.html        # Página principal
├── 📂backend/              # Lógica del servidor
│   ├── 📂middleware/       # Conexión a MongoDB
│   ├── 📂controllers/      # Lógica de las rutas
│   ├── 📂models/          # Esquemas de datos (Perfiles IT)
│   ├── 📂routes/           # Endpoints de la API
│   ├── index.js         # Punto de entrada de Node.js
│   └── .env              # Variables de entorno (Credenciales)
└── README.md
 ```
 ---

## 🔐 Seguridad y Autenticación
Para garantizar que solo los usuarios autorizados puedan gestionar la base de datos, se implementaron las siguientes medidas:

- **Acceso Restringido**: Mientras que la búsqueda y visualización de perfiles es pública, las funciones de Crear, Editar y Eliminar están protegidas.

- **Validación de Credenciales**: Sistema de Login que valida usuario y contraseña contra la base de datos.

- **Protección de Rutas**: El backend verifica la autenticidad de la sesión antes de procesar cualquier cambio en los perfiles.

- **Variables de Entorno**: Uso de .env para ocultar la URI de MongoDB y claves secretas del servidor. 

---

## 📸 Capturas de pantalla

**Buscador de Roles IT**
![Listado de perfiles](./assets/listado.png)
**Gestión de Talentos (CRUD)**
   ![Formulario modal](./assets/modal.png)

---

## ⚙️ Funcionalidades implementadas

### 🔑 Gestión de Acceso
- **Login de Administrador**: Formulario para acceder a las funciones de edición.

- **Persistencia de Sesión**: Manejo de estados para saber si el usuario está logueado.

### 🔍 Búsqueda y filtrado

- **Filtro por Tech Role**: Búsqueda específica por especialidad (Frontend, Backend, Data Analyst, etc.).
- **Búsqueda por Nombre**: Localización rápida de profesionales.
- **Filtro por Seniority**: Segmentación por nivel de experiencia (Junior, Semi Senior, Senior).
- **Reset de filtros**: Botón para limpiar los criterios de búsqueda y volver a listar todos los perfiles.

### 📋 Visualización de Tarjetas (Cards)
- Diseño responsive con Tailwind CSS.
- Etiquetas visuales para diferenciar rápidamente las categorías y niveles.

### ✏️Panel de Administración (CRUD)
- **Create**: Registro de nuevos perfiles tecnológicos mediante un modal.
- **Read**: Consumo de datos en tiempo real desde la API de MongoDB.
- **Update**: Edición de información de perfiles existentes.
- **Delete**: Eliminación de registros con sistema de confirmación.

---

## 🛠 Tecnologías utilizadas

  - **HTML5** (Estructura semántica para mejorar accesibilidad).
- **Tailwind CSS** (Estilizado moderno y responsive).
- **JavaScript Vanilla** (ES Modules) (Lógica del lado del cliente sin frameworks pesados).
- **MongoDB** (Base de datos NoSQL para persistencia de datos).
- **Fetch API** (Para comunicación asíncrona con el backend).
- **Git & GitHub** (control de versiones)

---

## ▶️ Instalación y uso

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/magamahe/Talent-Hub.git
   ```
2. Abrir el proyecto en VS Code
3. Ejecutar con **Live Server** o servidor local

   ```
   http://localhost:5500
   ```

> ⚠️ Importante: Al utilizar ES Modules, es obligatorio usar un servidor local (Live Server) para evitar errores de CORS y permitir la carga de los scripts.

---

## 👩‍💻 Autores

* **MARTINEZ HERRERO, Maria Gabriela**
<p>
  <a href="https://github.com/magamahe" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="32"/>
  </a>
  &nbsp;
  <a href="https://linkedin.com/in/magamahe" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="32"/>
  </a>
  &nbsp;
  <a href="mailto:magamahe@gmail.com">
    <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" width="32"/>
  </a>
</p>

---
