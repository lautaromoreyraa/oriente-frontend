/** Páginas disponibles en el panel admin */
export type AdminPage =
  | 'home'
  | 'about'
  | 'services'
  | 'combos';

/** Estado genérico de una operación async en el admin */
export interface AsyncState {
  loading: boolean;
  error:   string | null;
}

/** Item del sidebar */
export interface NavItem {
  page:  AdminPage;
  label: string;
  icon:  string;
}