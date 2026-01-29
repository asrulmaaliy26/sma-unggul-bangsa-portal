import { HomeData, CategoryData, LevelConfigData, AboutData } from '../types';

const API_BASE_URL = 'http://127.0.0.1:8000';

/**
 * Helper fetch dengan error detail
 */
const fetchJson = async <T>(url: string, errorMessage: string): Promise<T> => {
    const response = await fetch(url);

    let data: any = null;
    try {
        data = await response.json();
    } catch {
        throw new Error(`${errorMessage}: Response bukan JSON`);
    }

    if (!response.ok) {
        throw new Error(
            data?.message ||
            `${errorMessage}: (${response.status})`
        );
    }

    if (!data) {
        throw new Error(`${errorMessage}: Data kosong`);
    }

    return data as T;
};

/* ================= HOME ================= */

export const fetchHomeData = async (): Promise<HomeData> => {
    return fetchJson<HomeData>(
        `${API_BASE_URL}/home`,
        'Gagal mengambil data Home'
    );
};

/* ================= CATEGORIES ================= */

export const fetchCategories = async (): Promise<CategoryData> => {
    const data = await fetchJson<CategoryData>(
        `${API_BASE_URL}/categories`,
        'Gagal mengambil data kategori'
    );

    if (
        !data.project_categories ||
        !data.journal_categories ||
        !data.news_categories
    ) {
        throw new Error('Data kategori tidak lengkap');
    }

    return data;
};

export const fetchProjectCategories = async (): Promise<string[]> => {
    const data = await fetchCategories();

    if (data.project_categories.length === 0) {
        throw new Error('Kategori project tidak tersedia');
    }

    return data.project_categories;
};

export const fetchJournalCategories = async (): Promise<string[]> => {
    const data = await fetchCategories();

    if (data.journal_categories.length === 0) {
        throw new Error('Kategori jurnal tidak tersedia');
    }

    return data.journal_categories;
};

export const fetchNewsCategories = async (): Promise<string[]> => {
    const data = await fetchCategories();

    if (data.news_categories.length === 0) {
        throw new Error('Kategori berita tidak tersedia');
    }

    return data.news_categories;
};

/* ================= JENJANG ================= */

export const fetchLevelConfig = async (): Promise<LevelConfigData> => {
    const data = await fetchJson<LevelConfigData>(
        `${API_BASE_URL}/jenjang`,
        'Gagal mengambil konfigurasi jenjang'
    );

    if (Object.keys(data).length === 0) {
        throw new Error('Konfigurasi jenjang kosong');
    }

    return data;
};

/* ================= ABOUT ================= */

export const fetchAboutData = async (jenjang: string): Promise<AboutData> => {
    if (!jenjang) {
        throw new Error('Jenjang tidak boleh kosong');
    }

    const json = await fetchJson<any>(
        `${API_BASE_URL}/about/${jenjang.toLowerCase()}`,
        `Gagal mengambil data About untuk jenjang ${jenjang}`
    );

    if (!json.data) {
        throw new Error(`Data About jenjang ${jenjang} tidak ditemukan`);
    }

    return json.data as AboutData;
};
