import { api, tokenStore } from './api';

const PATH = '/api/v1/auth';

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResult {
  token:     string;
  expiresIn: number;
  username:  string;
}

export const authService = {
  /**
   * Autentica al admin y guarda el token en memoria.
   * Lanza 'UNAUTHORIZED' si las credenciales son incorrectas.
   */
  login: async (payload: LoginPayload): Promise<LoginResult> => {
    const result = await api.post<LoginResult>(`${PATH}/login`, payload);
    tokenStore.set(result.token);
    return result;
  },

  /** Elimina el token de memoria — el usuario queda deslogueado */
  logout: () => {
    tokenStore.clear();
  },

  /** true si hay un token activo en memoria */
  isAuthenticated: () => tokenStore.get() !== null,
};