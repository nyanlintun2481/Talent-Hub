import Perfil from '../models/perfil.js';



exports.obtenerPerfiles = async (req, res) => {
  try {
    const perfiles = await Perfil.find();
    res.json(perfiles);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener perfiles' });
  }
};

exports.crearPerfil = async (req, res) => {
  try {
    const perfil = new Perfil(req.body);
    await perfil.save();
    res.status(201).json(perfil);
  } catch (err) {
    res.status(500).json({ msg: 'Error al crear perfil' });
  }
};

exports.actualizarPerfil = async (req, res) => {
  try {
    const perfil = await Perfil.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(perfil);
  } catch (err) {
    res.status(500).json({ msg: 'Error al actualizar perfil' });
  }
};

exports.eliminarPerfil = async (req, res) => {
  try {
    await Perfil.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Perfil eliminado' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al eliminar perfil' });
  }
};
