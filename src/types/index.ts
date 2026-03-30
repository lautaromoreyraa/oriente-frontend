export interface Service {
  id: string;
  title: string;
  description: string;
  /** SVG path data — se renderiza en ServiceIcon */
  iconPath: string;
  /** 'kine' | 'estetica' — para separación visual */
  category: 'kine' | 'estetica';
}

export interface Combo {
  id: string;
  title: string;
  tagline: string;        // frase corta y comercial, una línea
  description: string;
  includes: string[];
  badge?: string;
}

export interface Differential {
  id: string;
  title: string;
  description: string;
}

export type Theme = 'light' | 'dark';

// re-exports from individual files for convenience
export * from './home';
export * from './contact';
export * from './about';
export * from './service';
export * from './combo';
export * from './admin';