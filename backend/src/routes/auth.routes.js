import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';  // <-- esto faltaba
import { login } from '../controllers/auth.controller.js';

const router = express.Router();

// Login de usuario
router.post('/login', login);

// Registro de usuario (solo para admin o pruebas)
router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Hasheamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creamos el usuario en la DB
    const newUser = await User.create({ email, password: hashedPassword, role });

    // Respondemos con los datos del usuario (sin la contraseña)
    res.status(201).json({ 
      id: newUser._id, 
      email: newUser.email, 
      role: newUser.role 
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
