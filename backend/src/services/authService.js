import prisma from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../middleware/errorHandler.js";

const register = async (data) => {
  const { nama_lengkap, email, username, password, id_klinik, is_admin } = data;

  // Check if user exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  // Hash password
  const password_hash = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      nama_lengkap,
      email,
      username,
      password_hash,
      id_klinik,
      is_admin: is_admin || false,
    },
    select: {
      id: true,
      username: true,
      email: true,
      nama_lengkap: true,
      id_klinik: true,
      is_admin: true,
      createdAt: true,
    },
  });

  return user;
};

const login = async (data) => {
  const { id, id_klinik, password } = data;

  // Find user
  const user = await prisma.user.findFirst({
    where: { id, id_klinik },
    include: {
      klinik: {
        select: {
          id: true,
          nama: true,
        },
      },
    },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password_hash);

  if (!isValidPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  // Generate token
  const token = jwt.sign(
    { userId: user.id, isAdmin: user.is_admin },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      nama_lengkap: user.nama_lengkap,
      is_admin: user.is_admin,
      klinik: user.klinik,
    },
  };
};

export default {
  register,
  login,
};
