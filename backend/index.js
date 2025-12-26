const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS
app.use(cors({
  origin: 'https://talent-hub-n6xb.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// APIs
app.use('/api/perfiles', require('./routes/perfilRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Mongo + Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Conectado');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server listo en ${PORT}`));
  })
  .catch(err => console.error(err));
