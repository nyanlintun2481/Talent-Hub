import Level from '../models/level.js';

export const createLevel = async (req, res) => {
  try {
    const { name } = req.body;
    const level = new Level({ name });
    await level.save();
    res.status(201).json(level);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLevels = async (req, res) => {
  try {
    const levels = await Level.find();
    res.json(levels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
