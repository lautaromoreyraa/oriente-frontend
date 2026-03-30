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

export interface ServiceFormData {
  slug:         string;
  title:        string;
  description:  string;
  category:     ServiceCategory;
  displayOrder: number;
  active:       boolean;
}