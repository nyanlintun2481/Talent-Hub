import express from 'express';
import { createLevel, getLevels } from '../controllers/level.controller.js';
import { protect, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Solo admin puede crear niveles

router.get('/', getLevels);
router.post('/', protect, isAdmin, createLevel);

export default router;
