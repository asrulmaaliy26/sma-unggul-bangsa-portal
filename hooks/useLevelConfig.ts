import { useContext } from 'react';
import { LevelConfigContext } from '../App';
import { LevelConfigData, EducationLevel } from '../types';

// Default fallback config jika API belum loaded
const DEFAULT_LEVEL_CONFIG: LevelConfigData = {
    'MI': { color: 'emerald', name: 'MI AL Hidayah', bg: 'bg-emerald-600', text: 'text-emerald-600', type: 'Madrasah Ibtidaiyah' },
    'SMP': { color: 'sky', name: 'SMP AL Hidayah', bg: 'bg-sky-600', text: 'text-sky-600', type: 'Sekolah Menengah Pertama' },
    'SMA': { color: 'islamic-green', name: 'SMA AL Hidayah', bg: 'bg-islamic-green-600', text: 'text-islamic-green-600', type: 'Sekolah Menengah Atas' },
    'KAMPUS': { color: 'indigo', name: 'STAI AL Hidayah', bg: 'bg-indigo-600', text: 'text-indigo-600', type: 'Sekolah Tinggi Agama Islam' },
    'UMUM': { color: 'slate', name: 'Yayasan AL Mannan', bg: 'bg-slate-900', text: 'text-slate-900', type: 'Pusat Yayasan' }
};

/**
 * Custom hook untuk mengakses LEVEL_CONFIG dari context
 * Mengembalikan config dari API atau fallback ke default jika belum loaded
 */
export const useLevelConfig = (): LevelConfigData => {
    const levelConfig = useContext(LevelConfigContext);
    return levelConfig || DEFAULT_LEVEL_CONFIG;
};
