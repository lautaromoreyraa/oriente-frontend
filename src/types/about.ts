export interface AboutStat {
  value: string;   // "7", "+500", "100%"
  label: string;   // "Especialidades", "Pacientes atendidos", etc.
}

export interface AboutContent {
  id:       number;
  heading:  string;
  body:     string;
  imageUrl?: string;
  active:   boolean;
  // Estadísticas — si el backend no las envía, se usan los fallbacks
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  // Diferenciales
  diff1Title?: string;
  diff1Desc?:  string;
  diff2Title?: string;
  diff2Desc?:  string;
  diff3Title?: string;
  diff3Desc?:  string;
  diff4Title?: string;
  diff4Desc?:  string;
}

export interface AboutFormData {
  heading:    string;
  body:       string;
  imageUrl?:  string;
  active:     boolean;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  // Diferenciales
  diff1Title?: string;
  diff1Desc?:  string;
  diff2Title?: string;
  diff2Desc?:  string;
  diff3Title?: string;
  diff3Desc?:  string;
  diff4Title?: string;
  diff4Desc?:  string;
}