import * as yup from 'yup';
import prisma from '../config/database.js';

export const registerSchema = yup.object({
  nama_lengkap: yup.string()
    .required('Nama lengkap wajib diisi')
    .max(40, 'Nama lengkap maksimal 40 karakter'),
  username: yup.string()
    .required('Username wajib diisi')
    .min(3, 'Username minimal 3 karakter')
    .max(20, 'Username maksimal 20 karakter')
    .test('unique-username', 'Username sudah digunakan', async (value) => {
      if (!value) return true;
      const user = await prisma.user.findUnique({ where: { username: value } });
      return !user;
    }),
  email: yup.string()
    .required('Email wajib diisi')
    .email('Format email tidak valid')
    .max(30, 'Email maksimal 30 karakter')
    .test('unique-email', 'Email sudah terdaftar', async (value) => {
      if (!value) return true;
      const user = await prisma.user.findUnique({ where: { email: value } });
      return !user;
    }),
  password: yup.string()
    .required('Password wajib diisi')
    .min(6, 'Password minimal 6 karakter'),
  id_klinik: yup.string()
    .required('Klinik wajib dipilih')
    .test('valid-klinik', 'Klinik tidak ditemukan', async (value) => {
      if (!value) return true;
      const klinik = await prisma.klinik.findUnique({ where: { id: value } });
      return !!klinik;
    }),
  is_admin: yup.boolean()
    .optional(),
});

export const loginSchema = yup.object({
  email: yup.string()
    .required('Email wajib diisi')
    .email('Format email tidak valid'),
  password: yup.string()
    .required('Password wajib diisi'),
});