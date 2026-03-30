import { api } from './api';
import type { Combo, ComboFormData } from '../types/combo';

const PATH = '/api/v1/combos';

export const combosService = {
  getAll:  ()                                  => api.get<Combo[]>(PATH),
  getById: (id: number)                        => api.get<Combo>(`${PATH}/${id}`),
  create:  (data: ComboFormData)               => api.post<Combo>(PATH, data),
  update:  (id: number, data: ComboFormData)   => api.put<Combo>(`${PATH}/${id}`, data),
  remove:  (id: number)                        => api.del(`${PATH}/${id}`),
};