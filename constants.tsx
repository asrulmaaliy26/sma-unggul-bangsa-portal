



import { NewsItem, ProjectItem, JournalItem, Achievement, Facility, EducationLevel } from './types';

export const SCHOOL_NAME = "Lembaga Pendidikan Islam Al Hidayah";

// ABOUT_CONTENT migrated to API /about/{jenjang}

export const MOCK_NEWS: NewsItem[] = [
  { id: '1', title: 'Siswa MA Menangkan Olimpiade Sains Nasional 2024', excerpt: 'Prestasi membanggakan kembali diraih...', content: '...', date: '24 Mei 2024', views: 1250, imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d', category: 'Prestasi', level: 'Nasional', jenjang: 'MA' },
  { id: '2', title: 'Lomba Mewarnai MI Unggul Bangsa', excerpt: 'Keceriaan santri MI dalam mengasah kreativitas...', content: '...', date: '10 Mei 2024', views: 500, imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9', category: 'Kegiatan', jenjang: 'MI' },
];

export const MOCK_PROJECTS: ProjectItem[] = [
  { id: 'p1', title: 'Irigasi IoT MA', category: 'Sains & Teknologi', description: 'Sistem irigasi otomatis berbasis IoT.', author: 'Tim MA', date: 'Mei 2024', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475', jenjang: 'MA' },
  { id: 'p2', title: 'Aplikasi Kantin Digital', category: 'Kewirausahaan', description: 'Aplikasi belanja cashless santri.', author: 'Tim MI', date: 'Mei 2024', imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c', jenjang: 'MI' }
];

export const MOCK_JOURNALS: JournalItem[] = [
  { id: 'j1', title: 'Zakat & Ekonomi Digital', category: 'Ekonomi Syariah', abstract: 'Studi efisiensi pengelolaan zakat via aplikasi.', author: 'Ahmad Mahasiswa', mentor: 'Dr. Zainal', score: 98, date: 'Juni 2024', isBest: true, jenjang: 'KAMPUS' },
  { id: 'j2', title: 'Eksperimen Bio-Gas Sekolah', category: 'Sains Terapan', abstract: 'Pemanfaatan limbah kantin menjadi energi.', author: 'Siswa MA', mentor: 'Guru Kimia', score: 92, date: 'Mei 2024', jenjang: 'MA' }
];

export const MOCK_FACILITIES: Facility[] = [
  { id: 'f1', name: 'Lab Komputer MA', type: 'Ruang', description: 'Laboratorium modern untuk riset IT.', imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998', jenjang: 'MA' },
  { id: 'f5', name: 'Robotik MA', type: 'Ekstra', description: 'Pengembangan teknologi robotika.', imageUrl: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb', jenjang: 'MA' },
];