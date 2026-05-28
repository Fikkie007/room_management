import jwt from 'jsonwebtoken';
import { AppError } from '../middleware/errorHandler.js';
import prisma from '../config/database.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Unauthorized: No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
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
      throw new AppError('Unauthorized: User not found', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(new AppError('Unauthorized: Invalid token', 401));
    } else if (error.name === 'TokenExpiredError') {
      next(new AppError('Unauthorized: Token expired', 401));
    } else {
      next(error);
    }
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (!req.user.is_admin) {
    throw new AppError('Forbidden: Admin access required', 403);
  }
  next();
};