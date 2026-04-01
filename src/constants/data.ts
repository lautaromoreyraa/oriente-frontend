import type { Service, Combo, Differential } from '../types';

// ─── Contacto ────────────────────────────────────────────
export const CONTACT = {
  whatsapp:        '+5493625214544',
  whatsappDisplay: '+54 9 362 521-4544',
  whatsappUrl:     'https://wa.me/5493625214544',
  instagram:       'oriente.rcia',
  instagramUrl:    'https://instagram.com/oriente.rcia',
  address:         'Roque Saenz Peña 555, Resistencia, Chaco',
  mapsUrl:         'https://maps.google.com/?q=Roque+Saenz+Peña+555+Resistencia+Chaco',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.3638991284693!2d-58.99119622454141!3d-27.457928176326423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450cf2a7eb2c6f%3A0x1c79dae8facf122c!2sRoque%20S%C3%A1enz%20Pe%C3%B1a%20555%2C%20H3500CEN%20Resistencia%2C%20Chaco!5e0!3m2!1ses!2sar!4v1772827508511!5m2!1ses!2sar',
};

// ─── Navegación ──────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Inicio',    href: '#inicio'    },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Combos',    href: '#combos'    },
  { label: 'Nosotros',  href: '#nosotros'  },
  { label: 'Contacto',  href: '#contacto'  },
];

// ─── Servicios ───────────────────────────────────────────
// iconPath: viewBox "0 0 24 24", stroke="currentColor", fill="none"
// Para reemplazar íconos: cambiar solo iconPath en cada objeto.
export const SERVICES: Service[] = [
  // ── Kinesiología ──
  {
    id:       'kinesiologia',
    category: 'kine',
    title:    'Kinesiología',
    description:
      'Rehabilitación funcional y recuperación post-lesión. Tratamientos personalizados para volver al movimiento.',
    iconPath:
      // figura humana con línea de movimiento (cuerpo + flecha ascendente)
      'M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-1 6h2l1.5 4.5L16 22h-2l-1-4h-2l-1 4H8l1.5-9.5L11 8zm-4 4H5m14 0h-2',
  },
   {
    id:       'acupuntura',
    category: 'kine',
    title:    'Acupuntura',
    description:
      'Técnica milenaria de medicina tradicional china. Estimulación de puntos energéticos para aliviar el dolor, reducir el estrés y restablecer el equilibrio del organismo.',
    iconPath:
      // aguja fina / línea punteada con punto de inserción
      'M12 2v14m0 0l-2-2m2 2l2-2M12 18v4M5 9h2m10 0h2M6.34 6.34l1.42 1.42m8.48 0 1.42-1.42M12 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  },
  {
    id:       'masajes',
    category: 'kine',
    title:    'Masajes',
    description:
      'Masajes terapéuticos y de relajación profunda. Técnicas especializadas para liberar tensiones y restaurar el equilibrio.',
    iconPath:
      // dos manos superpuestas / palmas
      'M8 6.5A2.5 2.5 0 0 1 10.5 4h0A2.5 2.5 0 0 1 13 6.5V12m0 0V7.5A2.5 2.5 0 0 1 15.5 5h0A2.5 2.5 0 0 1 18 7.5V12m0 0V9a2 2 0 0 1 4 0v5a7 7 0 0 1-7 7H9a7 7 0 0 1-7-7V9a2 2 0 0 1 4 0v3m0 0V6.5A2.5 2.5 0 0 1 8 4h0',
  },
  {
    id:       'gimnasia-adaptada',
    category: 'kine',
    title:    'Gimnasia Adaptada',
    description:
      'Clases grupales de movimiento suave y fortalecimiento, diseñadas para todas las edades. Ideal para adultos mayores que quieren mantenerse activos con seguridad y bienestar.',
    iconPath:
      // figura con brazos extendidos / movimiento libre
      'M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM5 8h14M8 8v4l-2 4m6-8v5l3 3m-3-3l-3 3',
  },

  // ── Estética ──
  {
    id:       'estetica',
    category: 'estetica',
    title:    'Medicina Estética',
    description:
      'Procedimientos faciales y corporales no invasivos con resultados visibles. Tecnología y experiencia profesional.',
    iconPath:
      // rombo / cristal (elegancia + precisión)
      'M12 2l5 7-5 13L7 9l5-7zm0 0v20M7 9h10',
  },
  {
    id:       'cosmiatra',
    category: 'estetica',
    title:    'Cosmiatría',
    description:
      'Cuidado profesional de la piel para tratar, mejorar y mantener su salud. Protocolos personalizados por tipo de piel.',
    iconPath:
      // hoja / pétalo estilizado
      'M12 22C6 22 3 17 3 12c0-3 1.5-6 4-8 0 3 1 5 3 7 .5-2 .5-4 0-6 3 2 5 5 5 9 1-1 1.5-3 1-5 2 2 3 5 3 7 0 4-3 6-7 6z',
  },
  {
    id:       'bronceado',
    category: 'estetica',
    title:    'Bronceado Cannelle',
    description:
      'Bronceado premium de la línea Cannelle. Resultados naturales, duraderos y sin exposición solar.',
    iconPath:
      // sol estilizado, rayos como líneas cortas
      'M12 3v2m0 14v2M3 12H1m22 0h-2m-2.05-7.07-1.41 1.41M6.34 17.66l-1.41 1.41m0-12.73 1.41 1.41M17.66 17.66l1.41 1.41M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z',
  },
  {
    id:       'makeup',
    category: 'estetica',
    title:    'Makeup',
    description:
      'Maquillaje artístico y profesional para eventos, producciones y ocasiones especiales. Técnica y creatividad.',
    iconPath:
      // pincel con trazo
      'M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.07M5 20l-1-4 7.07-7.07 4 4L8 21H5z',
  },
  {
    id:       'depilacion',
    category: 'estetica',
    title:    'Depilación Definitiva',
    description:
      'Métodos de depilación definitiva. Soluciones para todos los fototipos y zonas del cuerpo.',
    iconPath:
      // líneas suaves / superficie lisa
      'M5 8h14M5 12h14M5 16h10m2 0 2-2 2 2',
  },
];

// ─── Combos ──────────────────────────────────────────────
// Todos los campos de texto están centralizados aquí para facilitar edición futura.
export const COMBOS: Combo[] = [
  {
    id:          'combo-restauracion',
    title:       'Restauración Profunda',
    tagline:     'Cuerpo y piel en una sola visita',
    description:
      'Combinamos técnica kinesiológica y cuidado estético para quienes necesitan recuperarse por dentro y verse bien por fuera.',
    includes: [
      'Sesión de Kinesiología',
      'Hidratación facial profunda',
      'Masaje de cierre relajante',
    ],
    badge: 'Más elegido',
  },
  {
    id:          'combo-glow',
    title:       'Oriente Glow',
    tagline:     'Transformación estética completa',
    description:
      'El combo de imagen más completo del consultorio. Ideal para eventos, vacaciones o simplemente darte un merecido mimo.',
    includes: [
      'Bronceado Cannelle',
      'Sesión de Cosmiatría',
      'Maquillaje profesional',
    ],
    badge: 'Nuevo',
  },
  {
    id:          'combo-detox',
    title:       'Detox & Bienestar',
    tagline:     'Reset para tu mente y tu cuerpo',
    description:
      'Una experiencia de descanso activo para liberar tensiones, activar la circulación y renovar tu energía.',
    includes: [
      'Masaje descontracturante',
      'Tratamiento corporal hidratante',
      'Reflexología',
    ],
  },
  {
    id:          'combo-piel',
    title:       'Programa Piel',
    tagline:     'Resultados visibles desde la primera sesión',
    description:
      'Protocolo intensivo de cosmiatría diseñado para tratar, unificar y luminizar la piel del rostro.',
    includes: [
      'Diagnóstico cutáneo personalizado',
      'Tratamiento según tipo de piel',
      'Depilación facial de precisión',
    ],
  },
];

// ─── Diferenciales ───────────────────────────────────────
export const DIFFERENTIALS: Differential[] = [
  {
    id:          'equipo',
    title:       'Equipo profesional certificado',
    description:
      'Cada especialista cuenta con formación actualizada y experiencia comprobada en su área.',
  },
  {
    id:          'atencion',
    title:       'Atención personalizada',
    description:
      'Escuchamos cada caso con dedicación. Los tratamientos se adaptan a cada persona, no al revés.',
  },
  {
    id:          'espacio',
    title:       'Espacio pensado para vos',
    description:
      'Un ambiente cuidado en cada detalle, diseñado para que el bienestar empiece desde que entrás.',
  },
  {
    id:          'integralidad',
    title:       'Enfoque integral',
    description:
      'Kinesiología y estética bajo el mismo techo, para abordajes completos y coordinados.',
  },
];