// backend/src/server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Rutas
import perfilRoutes from './routes/profiles.routes.js';
import authRoutes from './routes/auth.routes.js';
import categoryRoutes from './routes/categoy.routes.js';
import levelRoutes from './routes/level.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// =====================
// MIDDLEWARES
// =====================
// Permitir requests desde tu frontend (producción)
app.use(cors({
  origin: 'https://talent-hub-m4t8.onrender.com/', // reemplaza con tu frontend si cambia
  credentials: true
}));

app.use(express.json());


// Middleware temporal de debug (opcional)
app.use('/api', (req, res, next) => {
  console.log('Request API:', req.method, req.originalUrl);
  next();
});

// =====================
// RUTAS API
// =====================
app.use('/api/perfiles', perfilRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/levels', levelRoutes);

// =====================
// SERVIR FRONTEND (SPA)
// =====================
const frontendPath = path.join(__dirname, '../../frontend');
app.use(express.static(frontendPath));

// Todas las demás rutas servirán index.html (para SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// =====================
// CONEXIÓN MONGO
// =====================
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/profilesdb';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error MongoDB:', err));

// =====================
// INICIO SERVIDOR
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
