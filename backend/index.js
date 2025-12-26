const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors({
  origin: [
    'https://talent-hub-n6xb.onrender.com',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Servir frontend
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/perfiles', require('./routes/perfilRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Catch-all para frontend (MUY IMPORTANTE)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Mongo + Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Conectado');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server listo en ${PORT}`));
  })
  .catch(err => console.error(err));
