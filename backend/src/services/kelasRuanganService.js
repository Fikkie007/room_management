import prisma from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';

const getAll = async (id_klinik) => {
  const where = id_klinik ? { id_klinik, is_active: true } : { is_active: true };

  const kelas = await prisma.kelasRuangan.findMany({
    where,
    include: {
      klinik: true,
    },
    orderBy: { nama_kelas: 'asc' },
  });

  return kelas;
};

const getById = async (id) => {
  const kelas = await prisma.kelasRuangan.findUnique({
    where: { id },
    include: {
      klinik: true,
    },
  });

  if (!kelas) {
    throw new AppError('Kelas ruangan not found', 404);
  }

  return kelas;
};

export default {
  getAll,
  getById,
};