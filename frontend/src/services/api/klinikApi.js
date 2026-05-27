import fetchApi from './fetchApi';

const klinikApi = {
  getAll: async () => {
    return fetchApi('/klinik');
  },

  getById: async (id) => {
    return fetchApi(`/klinik/${id}`);
  },
};

export default klinikApi;