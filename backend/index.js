import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

/* ====== MIDDLEWARES ====== */
app.use(cors({
  origin: '*', // luego lo afinamos
}));
app.use(express.json());

/* ====== RUTA BASE ====== */
app.get('/', (req, res) => {
  res.send('API Talent Hub funcionando 🚀');
});

/* ====== MODELO ====== */
const perfilSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    category: String,
    seniority: String,
    avatar: String,
  },
  { timestamps: true }
);

const Perfil = mongoose.model('Perfil', perfilSchema);

/* ====== CRUD ====== */

// GET todos
app.get('/api/perfiles', async (req, res) => {
  const perfiles = await Perfil.find();
  res.json(perfiles);
});

// POST crear
app.post('/api/perfiles', async (req, res) => {
  const nuevo = new Perfil(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
});

// PUT editar
app.put('/api/perfiles/:id', async (req, res) => {
  const actualizado = await Perfil.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(actualizado);
});

// DELETE eliminar
app.delete('/api/perfiles/:id', async (req, res) => {
  await Perfil.findByIdAndDelete(req.params.id);
  res.json({ message: 'Perfil eliminado' });
});

/* ====== CONEXIÓN ====== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(process.env.PORT || 3000, () =>
      console.log('Servidor activo')
    );
  })
  .catch(err => console.error(err));
