import fetchApi from './fetchApi';

const kategoriRuanganApi = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.perPage) query.append('perPage', params.perPage);
    if (params.search) query.append('search', params.search);
    if (params.id_klinik) query.append('id_klinik', params.id_klinik);
    if (params.is_active !== undefined && params.is_active !== '') query.append('is_active', params.is_active);

    return fetchApi(`/kategori-ruangan?${query.toString()}`);
  },

  getById: async (id) => {
    return fetchApi(`/kategori-ruangan/${id}`);
  },

  create: async (data) => {
    return fetchApi('/kategori-ruangan', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id, data) => {
    return fetchApi(`/kategori-ruangan/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id) => {
    return fetchApi(`/kategori-ruangan/${id}`, {
      method: 'DELETE',
    });
  },
};

export default kategoriRuanganApi;