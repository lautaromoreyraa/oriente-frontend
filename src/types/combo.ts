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

export interface ComboFormData {
  slug:         string;
  title:        string;
  tagline:      string;
  description:  string;
  badge?:       string;
  displayOrder: number;
  active:       boolean;
  items:        Omit<ComboItem, 'id'>[];
}