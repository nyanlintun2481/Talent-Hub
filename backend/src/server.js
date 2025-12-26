// backend/src/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import perfilRoutes from './routes/profiles.routes.js';
import authRoutes from './routes/auth.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// =====================
// MIDDLEWARES
// =====================
// Para desarrollo: permitir cualquier origen
/* app.use(cors()); */

// Para producción: limitar a tu frontend
app.use(cors({
  origin: 'https://talent-hub-zxqo.onrender.com',
  credentials: true
}));

app.use(express.json());

// =====================
// RUTAS API
// =====================
app.use('/api/perfiles', perfilRoutes);
app.use('/api/auth', authRoutes);

// =====================
// SERVIR FRONTEND (SPA)
// =====================
const frontendPath = path.join(__dirname, '../../frontend');
app.use(express.static(frontendPath));

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
