// Refleja exactamente la respuesta de GET /api/v1/combos
export interface ComboItem {
  id:           number;
  description:  string;
  displayOrder: number;
}

export interface Combo {
  id:           number;
  slug:         string;
  title:        string;
  tagline:      string;
  description:  string;
  badge?:       string;
  displayOrder: number;
  active:       boolean;
  items:        ComboItem[];
}

// Para crear/editar — lo que se envía al backend
export interface ComboFormData {
  title:        string;
  tagline:      string;
  description:  string;
  badge?:       string;
  displayOrder: number;
  active:       boolean;
  items:        Omit<ComboItem, 'id'>[];
}