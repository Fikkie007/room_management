import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import kategoriRuanganRoutes from './routes/kategoriRuanganRoutes.js';
import klinikRoutes from './routes/klinikRoutes.js';
import kelasRuanganRoutes from './routes/kelasRuanganRoutes.js';
import prisma from './config/database.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
prisma.$connect()
  .then(() => console.log('✅ Database connected'))
  .catch((err) => console.error('❌ Database connection error:', err));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Room Management API' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/kategori-ruangan', kategoriRuanganRoutes);
app.use('/api/klinik', klinikRoutes);
app.use('/api/kelas-ruangan', kelasRuanganRoutes);

// Error handler
app.use(errorHandler);

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('👋 Database disconnected');
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});