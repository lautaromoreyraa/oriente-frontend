// Refleja exactamente la respuesta de GET /api/v1/services
export type ServiceCategory = 'KINE' | 'ESTETICA';

export interface Service {
  id:           number;
  slug:         string;
  title:        string;
  description:  string;
  category:     ServiceCategory;
  displayOrder: number;
  active:       boolean;
}

// Para crear/editar
export interface ServiceFormData {
  title:        string;
  description:  string;
  category:     ServiceCategory;
  displayOrder: number;
  active:       boolean;
}