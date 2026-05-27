const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const getAuthToken = () => localStorage.getItem('token');

const fetchWithAuth = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.message || 'An error occurred');
    error.response = { status: response.status };
    throw error;
  }

  return response.json();
};

export default fetchWithAuth;