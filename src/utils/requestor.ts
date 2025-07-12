import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // alto backend
  // baseURL: process.env.W_API_BASE_URL || '/', //  por si mañana queremos configurar el API base
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: false //--> aqui false ya que no necesito estas cosas aqui, en el cloud debe ser true
});

/**
 * Interceptor para añadir automaticamente el token CSRF a todas las peticiones.
 */
axiosInstance.interceptors.request.use((config) => {
  //--> esto solo para un proyecto de rails, aqui esto no deberia afectar en nada asi que lo dejo sapo
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  const lang = 'es'; //--> harcoding

  if (csrfToken && config.headers) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }

  // Agregar idioma che
  if (lang) {
    if (!config.data) config.data = {};
    config.data.locale = lang;
  }

  return config;
});

const isAxiosError = (error: unknown): error is AxiosError => {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error;
};

/**
 * Interceptor global para manejo de errores.
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (isAxiosError(error)) {
      console.error(`[W] HTTP Error: ${error.response?.status}`, error.response?.data);
    } else if (error instanceof Error) {
      console.error('Network Error:', error.message);
    } else {
      console.error('[W] Unknown Error:', error);
    }
    return Promise.reject(error);
  }
);

/**
 * Cliente API reutilizable para requests HTTP mediante Axios.
 *
 * @param config Configuracion del request.
 * @returns Promesa con la respuesta parseada en JSON.
 *
 * @throws AxiosError cuando la request falla.
 *
 * @example
 * ```ts
 * const response = await apiClient({
 *   method: 'GET',
 *   url: '/algo',
 *   params: { page: 1, react: true, country: venezuela  }
 * });
 * ```
 */

export const requestor = async <T>(config: AxiosRequestConfig): Promise<{ data: T; status: number }> => {
  const response = await axiosInstance.request<T>(config);
  return {
    data: response.data,
    status: response.status
  };
};
