// src/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

/**
 * Middleware para proteger rutas mediante JWT
 */
export const protect = async (req, res, next) => {
  let token;

  // Revisamos que el header Authorization exista
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Guardamos info del usuario en req.user
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Token faltante' });
  }
};

/**
 * Middleware para verificar rol de admin
 */
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // todo ok
  } else {
    res.status(403).json({ message: 'Acceso restringido a administradores' });
  }
};
