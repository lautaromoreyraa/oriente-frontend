import { api } from './api';
import type { Service, ServiceFormData } from '../types/service';

const PATH = '/api/v1/services';

export const servicesService = {
  getAll:  ()                                    => api.get<Service[]>(PATH),
  getById: (id: number)                          => api.get<Service>(`${PATH}/${id}`),
  create:  (data: ServiceFormData)               => api.post<Service>(PATH, data),
  update:  (id: number, data: ServiceFormData)   => api.put<Service>(`${PATH}/${id}`, data),
  remove:  (id: number)                          => api.del(`${PATH}/${id}`),
};