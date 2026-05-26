import kelasRuanganService from '../services/kelasRuanganService.js';

const getAll = async (req, res, next) => {
  try {
    const { id_klinik } = req.query;
    const result = await kelasRuanganService.getAll(id_klinik);
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
    const result = await kelasRuanganService.getById(req.params.id);
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