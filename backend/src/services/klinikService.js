import prisma from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';

const getAll = async (id_klinik) => {
  const where = id_klinik ? { id_klinik } : {};

  const klinik = await prisma.klinik.findMany({
    where,
    orderBy: { nama: 'asc' },
  });

  return klinik;
};

const getById = async (id) => {
  const klinik = await prisma.klinik.findUnique({
    where: { id },
  });

  if (!klinik) {
    throw new AppError('Klinik not found', 404);
  }

  return klinik;
};

export default {
  getAll,
  getById,
};