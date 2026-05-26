import express from 'express';
import kelasRuanganController from '../controllers/kelasRuanganController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, kelasRuanganController.getAll);
router.get('/:id', authenticate, kelasRuanganController.getById);

export default router;