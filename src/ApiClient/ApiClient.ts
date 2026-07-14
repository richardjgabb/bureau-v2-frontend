const API_URL = import.meta.env.VITE_API_URL;

const apiRequest = async (endpoint: string, options = {}) => {
  // 1. Automatically grab the token from localStorage
  const token = localStorage.getItem('token');

  // 2. Set up default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // 3. If the token exists, inject the Authorization header
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // 4. Perform the fetch
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // 5. Global handler for expired tokens (401 Unauthorized)
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Force redirect to login
    throw new Error('Session expired. Please log in again.');
  }

  return response;
};

export default apiRequest;