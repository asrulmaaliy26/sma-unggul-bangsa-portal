

import { NewsItem, ProjectItem, JournalItem, Achievement, Facility, EducationLevel } from './types';

export const SCHOOL_NAME = "Lembaga Pendidikan Islam Al Hidayah";

export const LEVEL_CONFIG: Record<EducationLevel, { color: string, name: string, bg: string, text: string, type: string }> = {
  'MI': { color: 'emerald', name: 'MI AL Hidayah', bg: 'bg-emerald-600', text: 'text-emerald-600', type: 'Madrasah Ibtidaiyah' },
  'SMP': { color: 'sky', name: 'SMP AL Hidayah', bg: 'bg-sky-600', text: 'text-sky-600', type: 'Sekolah Menengah Pertama' },
  'SMA': { color: 'islamic-green', name: 'SMA AL Hidayah', bg: 'bg-islamic-green-600', text: 'text-islamic-green-600', type: 'Sekolah Menengah Atas' },
  'KAMPUS': { color: 'indigo', name: 'STAI AL Hidayah', bg: 'bg-indigo-600', text: 'text-indigo-600', type: 'Sekolah Tinggi Agama Islam' },
  'UMUM': { color: 'slate', name: 'Yayasan AL Mannan', bg: 'bg-slate-900', text: 'text-slate-900', type: 'Pusat Yayasan' }
};

export const ABOUT_CONTENT: Record<EducationLevel, any> = {
  'UMUM': {
    history: "Yayasan Unggul Bangsa didirikan pada tahun 1990 dengan cita-cita besar untuk membangun ekosistem pendidikan yang mengintegrasikan kecerdasan intelektual dengan nilai-nilai luhur Al-Qur'an.",
    visi: "Menjadi pusat keunggulan peradaban Islam di Indonesia melalui pendidikan terpadu yang berkualitas dan inklusif.",
    misi: ["Mengelola lembaga pendidikan yang profesional dan akuntabel.", "Menyediakan fasilitas modern.", "Mencetak kader pemimpin berkarakter Qurani."],
    struktur: { pimpinan: "Ketua Dewan Pembina", nama: "Prof. Dr. KH. Abdul Fattah", staff: [{ role: "Sekretaris", name: "Hj. Siti Aminah" }, { role: "Bendahara", name: "H. Ridwan Hakim" }] }
  },
  'SMA': {
    history: "SMA Unggul Bangsa didirikan sebagai sekolah model yang mengedepankan riset teknologi dan tahfidz Quran.",
    visi: "Terwujudnya cendekiawan muslim yang inovatif, kompetitif secara global, dan hafidz Quran.",
    misi: ["Pembelajaran STEM berbasis nilai Islam.", "Hafalan minimal 5 Juz.", "Potensi kepemimpinan."],
    struktur: { pimpinan: "Kepala Sekolah", nama: "Dr. Ahmad Wijaya, M.Pd", staff: [{ role: "Wakasek Kurikulum", name: "Ibu Siti Zulaikha" }] }
  },
  'MI': { history: "MI Unggul Bangsa berfokus pada karakter dasar anak.", visi: "Membentuk anak sholeh yang cerdas.", misi: ["Ibadah harian.", "Baca tulis Quran."], struktur: { pimpinan: "Kepala Madrasah", nama: "Hj. Mariam Ulfa", staff: [] } },
  'SMP': { history: "SMP Unggul Bangsa adalah masa transisi krusial.", visi: "Unggul prestasi dan budi pekerti.", misi: ["Bahasa Arab & Inggris.", "Minat riset."], struktur: { pimpinan: "Kepala Sekolah", nama: "Bpk. Suryadi, M.Pd", staff: [] } },
  'KAMPUS': { history: "STAI Unggul Bangsa melahirkan intelektual muslim.", visi: "Pusat riset ekonomi syariah.", misi: ["Pendidikan tinggi berkualitas.", "Pengabdian masyarakat."], struktur: { pimpinan: "Ketua STAI", nama: "Dr. Zainal Arifin", staff: [] } }
};

// export const SLIDES = [
//   { image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1', title: 'Membangun Generasi Qurani', subtitle: 'Integrasi ilmu modern dengan Al-Quran.' },
//   { image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3', title: 'Inovasi Tanpa Batas', subtitle: 'Riset dan teknologi dalam bingkai keislaman.' },
//   { image: 'https://images.unsplash.com/photo-1524178232363-1fb28f74b671', title: 'Pendidikan Berkualitas', subtitle: 'Berdedikasi tinggi untuk masa depan gemilang.' }
// ];

export const MOCK_NEWS: NewsItem[] = [
  { id: '1', title: 'Siswa SMA Menangkan Olimpiade Sains Nasional 2024', excerpt: 'Prestasi membanggakan kembali diraih...', content: '...', date: '24 Mei 2024', views: 1250, imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d', category: 'Prestasi', level: 'Nasional', jenjang: 'SMA' },
  { id: '2', title: 'Lomba Mewarnai MI Unggul Bangsa', excerpt: 'Keceriaan santri MI dalam mengasah kreativitas...', content: '...', date: '10 Mei 2024', views: 500, imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9', category: 'Kegiatan', jenjang: 'MI' },
];

export const MOCK_PROJECTS: ProjectItem[] = [
  { id: 'p1', title: 'Irigasi IoT SMA', category: 'Sains & Teknologi', description: 'Sistem irigasi otomatis berbasis IoT.', author: 'Tim SMA', date: 'Mei 2024', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475', jenjang: 'SMA' },
  { id: 'p2', title: 'Aplikasi Kantin Digital', category: 'Kewirausahaan', description: 'Aplikasi belanja cashless santri.', author: 'Tim MI', date: 'Mei 2024', imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c', jenjang: 'MI' }
];

export const MOCK_JOURNALS: JournalItem[] = [
  { id: 'j1', title: 'Zakat & Ekonomi Digital', category: 'Ekonomi Syariah', abstract: 'Studi efisiensi pengelolaan zakat via aplikasi.', author: 'Ahmad Mahasiswa', mentor: 'Dr. Zainal', score: 98, date: 'Juni 2024', isBest: true, jenjang: 'KAMPUS' },
  { id: 'j2', title: 'Eksperimen Bio-Gas Sekolah', category: 'Sains Terapan', abstract: 'Pemanfaatan limbah kantin menjadi energi.', author: 'Siswa SMA', mentor: 'Guru Kimia', score: 92, date: 'Mei 2024', jenjang: 'SMA' }
];

export const MOCK_FACILITIES: Facility[] = [
  { id: 'f1', name: 'Lab Komputer SMA', type: 'Ruang', description: 'Laboratorium modern untuk riset IT.', imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998', jenjang: 'SMA' },
  { id: 'f5', name: 'Robotik SMA', type: 'Ekstra', description: 'Pengembangan teknologi robotika.', imageUrl: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb', jenjang: 'SMA' },
];

// export const SCHOOL_STATS = [
//   { label: 'Total Murid', value: '2,400' },
//   { label: 'Guru & Dosen', value: '150' },
//   { label: 'Gedung', value: '12' },
//   { label: 'Alumni', value: '10k+' },
// ];
