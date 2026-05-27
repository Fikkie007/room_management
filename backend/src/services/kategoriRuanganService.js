import prisma from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';

const getAll = async ({ page, perPage, search, id_klinik, is_active }) => {
  const skip = (page - 1) * perPage;

  const where = {
    ...(search && {
      nama_ruangan: {
        contains: search,
        mode: 'insensitive',
      },
    }),
    ...(id_klinik && { id_klinik }),
    ...(is_active !== undefined && { is_active }),
  };

  const [data, total] = await Promise.all([
    prisma.kategoriRuangan.findMany({
      where,
      skip,
      take: perPage,
      include: {
        klinik: true,
        kelasRuangan: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.kategoriRuangan.count({ where }),
  ]);

  return {
    data,
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  };
};

const getById = async (id) => {
  const ruangan = await prisma.kategoriRuangan.findUnique({
    where: { id },
    include: {
      klinik: true,
      kelasRuangan: true,
    },
  });

  if (!ruangan) {
    throw new AppError('Ruangan not found', 404);
  }

  return ruangan;
};

const create = async (data) => {
  const ruangan = await prisma.kategoriRuangan.create({
    data: {
      id_klinik: data.id_klinik,
      id_kelas_ruangan: data.id_kelas_ruangan,
      jenis_kelamin: data.jenis_kelamin,
      usia: data.usia,
      penyakit: data.penyakit,
      nama_ruangan: data.nama_ruangan,
      harga_ruangan: data.harga_ruangan,
      fasilitas_ruangan: data.fasilitas_ruangan,
    },
    include: {
      klinik: true,
      kelasRuangan: true,
    },
  });

  return ruangan;
};

const update = async (id, data) => {
  const existing = await prisma.kategoriRuangan.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new AppError('Ruangan not found', 404);
  }

  const ruangan = await prisma.kategoriRuangan.update({
    where: { id },
    data: {
      id_klinik: data.id_klinik,
      id_kelas_ruangan: data.id_kelas_ruangan,
      jenis_kelamin: data.jenis_kelamin,
      usia: data.usia,
      penyakit: data.penyakit,
      nama_ruangan: data.nama_ruangan,
      harga_ruangan: data.harga_ruangan,
      fasilitas_ruangan: data.fasilitas_ruangan,
      is_active: data.is_active,
    },
    include: {
      klinik: true,
      kelasRuangan: true,
    },
  });

  return ruangan;
};

const deleteRuangan = async (id) => {
  const existing = await prisma.kategoriRuangan.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new AppError('Ruangan not found', 404);
  }

  // Soft delete
  await prisma.kategoriRuangan.update({
    where: { id },
    data: { is_active: false },
  });
};

export default {
  getAll,
  getById,
  create,
  update,
  delete: deleteRuangan,
};