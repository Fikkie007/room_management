import klinikService from '../services/klinikService.js';

const getAll = async (req, res, next) => {
  try {
    const { id_klinik } = req.query;
    const result = await klinikService.getAll(id_klinik);
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
    const result = await klinikService.getById(req.params.id);
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
};