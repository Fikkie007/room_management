import fetchApi from './fetchApi';

const kelasRuanganApi = {
  getAll: async () => {
    return fetchApi('/kelas-ruangan');
  },

  getById: async (id) => {
    return fetchApi(`/kelas-ruangan/${id}`);
  },
};

export default kelasRuanganApi;