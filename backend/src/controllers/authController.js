import authService from '../services/authService.js';
import { registerSchema, loginSchema } from '../validations/authValidation.js';
import { formatYupErrors } from '../utils/validation.js';
import { ValidationError } from 'yup';

const register = async (req, res, next) => {
  try {
    const validatedData = await registerSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    const result = await authService.register(validatedData);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        errors: formatYupErrors(error),
      });
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const validatedData = await loginSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    const result = await authService.login(validatedData);
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        errors: formatYupErrors(error),
      });
    }
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  getMe,
};