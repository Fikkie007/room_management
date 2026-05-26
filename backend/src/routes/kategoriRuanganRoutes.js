import express from 'express';
import kategoriRuanganController from '../controllers/kategoriRuanganController.js';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// All users can read
router.get('/', authenticate, kategoriRuanganController.getAll);
router.get('/:id', authenticate, kategoriRuanganController.getById);

// Admin only
router.post('/', authenticate, authorizeAdmin, kategoriRuanganController.create);
router.put('/:id', authenticate, authorizeAdmin, kategoriRuanganController.update);
router.delete('/:id', authenticate, authorizeAdmin, kategoriRuanganController.delete);

export default router;