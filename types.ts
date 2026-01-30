
export type EducationLevel = string;

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  views: number;
  main_image: string;
  category: string;
  education_level: EducationLevel;
  gallery: string[];
}

export interface ProjectDocument {
  type: string;
  format: string;
  title: string;
  url: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  author: string;
  date: string;
  imageUrl: string;
  jenjang: EducationLevel;
  documents?: ProjectDocument[];
}

export interface JournalItem {
  id: string;
  title: string;
  category: string; // Added category
  abstract: string;
  author: string;
  mentor: string;
  score: number;
  date: string;
  isBest?: boolean;
  is_best?: boolean;
  jenjang: EducationLevel;
  fileUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  year: string;
  level: 'Sekolah' | 'Internasional' | 'Nasional' | 'Provinsi' | 'Kota' | 'Kabupaten' | 'Kecamatan';
  description: string;
  jenjang: EducationLevel;
}

export interface Facility {
  id: string;
  name: string;
  type: 'Ruang' | 'Ekstra';
  description: string;
  imageUrl: string;
  jenjang: EducationLevel;
}
export interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface HomeData {
  stats: Record<string, Stat[]>;
  slides: Slide[];
}

export interface CategoryData {
  project_categories: string[];
  journal_categories: string[];
  news_categories: string[];
}

export interface LevelConfigItem {
  color: string;
  name: string;
  bg: string;
  text: string;
  type: string;
}

export type LevelConfigData = Record<EducationLevel, LevelConfigItem>;

export interface AboutData {
  history: string;
  visi: string;
  misi: string[];
  struktur: {
    pimpinan: string;
    nama: string;
    staff: Array<{ role: string; name: string }>;
  };
}
