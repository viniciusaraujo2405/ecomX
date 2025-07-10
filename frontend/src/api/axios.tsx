import axios from 'axios';

// Configura a URL base do seu backend.
// Certifique-se de que esta URL corresponde à do seu backend.
const api = axios.create({
  baseURL: 'http://localhost:3000', // Altere se o seu backend estiver em outra porta ou URL
});

// Interceptor de requisição para adicionar o token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Pega o token do localStorage [cite: 273]
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Adiciona o token ao cabeçalho de autorização [cite: 277]
  }
  return config; // Retorna a configuração modificada [cite: 278]
});

export default api;