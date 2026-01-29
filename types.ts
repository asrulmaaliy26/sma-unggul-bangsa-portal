
export type EducationLevel = 'MI' | 'SMP' | 'SMA' | 'KAMPUS' | 'UMUM';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  views: number;
  imageUrl: string;
  category: 'Akademik' | 'Kegiatan' | 'Pengumuman' | 'Prestasi';
  level?: 'Nasional' | 'Internasional' | 'Provinsi';
  attachments?: string[];
  jenjang: EducationLevel;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string; // Added category
  description: string;
  author: string;
  date: string;
  imageUrl: string;
  jenjang: EducationLevel;
  fileUrl?: string;
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
  jenjang: EducationLevel;
  fileUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  year: string;
  level: 'Nasional' | 'Internasional' | 'Provinsi';
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
  stats: Stat[];
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
