const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const path = require('path');

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta principal para servir el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});
app.use('/api/perfiles', require('./routes/perfilRoutes'));
app.use('/api/auth', require('./routes/authRoutes')); // Aquí iría el login

// Conexión Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Conectado');
    app.listen(process.env.PORT || 5000, () => console.log('🚀 Server listo'));
  })
  .catch(err => console.log(err));
