import mongoose from 'mongoose';

const perfilSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    seniority: { type: String, required: true },
    avatar: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Perfil', perfilSchema);
