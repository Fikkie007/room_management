import fetchApi from './fetchApi';

const authApi = {
  login: async (formData) => {
    return fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },

  register: async (formData) => {
    return fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },
};

export default authApi;