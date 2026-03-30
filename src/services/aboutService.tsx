import { api } from './api';
import type { AboutContent, AboutFormData } from '../types/about';

const PATH = '/api/v1/about-sections';

export const aboutService = {
  getAll:  ()                               => api.get<AboutContent[]>(PATH),
  get:     ()                               => api.get<AboutContent[]>(PATH).then(list => list[0] ?? null),
  getById: (id: number)                     => api.get<AboutContent>(`${PATH}/${id}`),
  create:  (data: AboutFormData)            => api.post<AboutContent>(PATH, data),
  update:  (id: number, data: AboutFormData) => api.put<AboutContent>(`${PATH}/${id}`, data),
  remove:  (id: number)                     => api.del(`${PATH}/${id}`),
};