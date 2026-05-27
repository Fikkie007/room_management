import kategoriRuanganService from "../services/kategoriRuanganService.js";
import { formatYupErrors } from "../utils/validation.js";
import { kategoriRuanganSchema } from "../validations/kategoriRuanganValidation.js";

const getAll = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, search, id_klinik } = req.query;
    const result = await kategoriRuanganService.getAll({
      page: parseInt(page),
      perPage: parseInt(perPage),
      search,
      id_klinik,
    });
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await kategoriRuanganService.getById(req.params.id);
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const validatedData = await kategoriRuanganSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const result = await kategoriRuanganService.create(req.body);
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

const update = async (req, res, next) => {
  try {
    const result = await kategoriRuanganService.update(req.params.id, req.body);
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRuangan = async (req, res, next) => {
  try {
    await kategoriRuanganService.delete(req.params.id);
    res.json({
      success: true,
      message: "Ruangan deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  delete: deleteRuangan,
};
