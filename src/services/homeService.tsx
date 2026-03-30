import { api } from './api';
import type { HomeContent, HomeFormData } from '../types/home';

const PATH = '/api/v1/hero-sections';

export const homeService = {
  getAll:  ()                              => api.get<HomeContent[]>(PATH),
  get:     ()                              => api.get<HomeContent[]>(PATH).then(list => list[0] ?? null),
  getById: (id: number)                    => api.get<HomeContent>(`${PATH}/${id}`),
  create:  (data: HomeFormData)            => api.post<HomeContent>(PATH, data),
  update:  (id: number, data: HomeFormData) => api.put<HomeContent>(`${PATH}/${id}`, data),
  remove:  (id: number)                    => api.del(`${PATH}/${id}`),
};