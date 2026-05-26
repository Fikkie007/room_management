import express from 'express';
import klinikController from '../controllers/klinikController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, klinikController.getAll);
router.get('/:id', authenticate, klinikController.getById);

export default router;