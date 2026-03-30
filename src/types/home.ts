// Refleja exactamente la respuesta de GET /api/v1/hero-sections
export interface HomeContent {
  id:                 number;
  title:              string;
  subtitle:           string;
  ctaText:            string;
  ctaUrl?:            string;
  backgroundImageUrl?: string;
  active:             boolean;
}

export interface HomeFormData {
  title:              string;
  subtitle:           string;
  ctaText:            string;
  ctaUrl?:            string;
  backgroundImageUrl?: string;
  active:             boolean;
}