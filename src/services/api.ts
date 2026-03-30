const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

// ── Token en memoria — nunca en localStorage ──────────────
// Se pierde al cerrar la pestaña: comportamiento correcto para un panel admin.
let _token: string | null = null;

export const tokenStore = {
  get:   ()          => _token,
  set:   (t: string) => { _token = t; },
  clear: ()          => { _token = null; },
};

// ── Cliente base ──────────────────────────────────────────
async function request<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };

  // Inyectar JWT en todas las escrituras automáticamente
  if (method !== 'GET' && _token) {
    headers['Authorization'] = `Bearer ${_token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // 401 → token expirado o inválido, limpiar token
  if (res.status === 401) {
    _token = null;
    throw new Error('UNAUTHORIZED');
  }

  if (!res.ok) throw new Error(`API error ${res.status}: ${method} ${path}`);

  // 204 No Content — DELETE suele devolver esto
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

export const api = {
  get:  <T>(path: string)                => request<T>('GET',    path),
  post: <T>(path: string, body: unknown) => request<T>('POST',   path, body),
  put:  <T>(path: string, body: unknown) => request<T>('PUT',    path, body),
  del:  <T = void>(path: string)         => request<T>('DELETE', path),
};