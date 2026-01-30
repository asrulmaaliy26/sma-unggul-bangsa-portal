import { HomeData, CategoryData, LevelConfigData, AboutData, NewsItem, ProjectItem, JournalItem, Facility } from '../types';

const API_BASE_URL = 'https://admin.staialmannan.ac.id';

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

/**
 * Mendapatkan default jenjang berdasarkan Environment Variable atau Subdomain
 */
export const getDefaultLevel = (): string => {
    // 1. Cek Environment Variable (VITE_DEFAULT_JENJANG)
    const envLevel = (import.meta as any).env.VITE_DEFAULT_JENJANG;
    if (envLevel) {
        return envLevel.toUpperCase();
    }

    // 2. Cek Subdomain
    try {
        const hostname = window.location.hostname;
        const parts = hostname.split('.');

        // Menangani case: sub.domain.com atau sub.localhost
        // Jika parts > 2 (misal sma.sekolah.com) maka ambil sma
        // Jika localhost (misal sma.localhost) maka ambil sma
        if (parts.length > 0) {
            const subdomain = parts[0].toUpperCase();

            // Check if subdomain matches valid levels directly
            const validLevels = ['TK', 'SD', 'SMP', 'SMA', 'STAI'];
            if (validLevels.includes(subdomain)) {
                return subdomain;
            }

            // Mapping alternatif
            const altMapping: Record<string, string> = {
                'MA': 'SMA',
                'MI': 'SD',
                'MTS': 'SMP',
                'KAMPUS': 'STAI',
                'UNIV': 'STAI'
            };

            if (altMapping[subdomain]) {
                return altMapping[subdomain];
            }
        }
    } catch (e) {
        console.error("Error parsing hostname for level detection", e);
    }

    return 'UMUM';
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

/* ================= CONTENT (News, Projects, Journals, Facilities) ================= */

// LISTS

export const fetchNews = async (): Promise<NewsItem[]> => {
    const json = await fetchJson<{ data: NewsItem[] }>(
        `${API_BASE_URL}/news`,
        'Gagal mengambil data Berita'
    );
    return json.data;
};

export const fetchLatestNews = async (): Promise<NewsItem[]> => {
    const json = await fetchJson<{ data: NewsItem[] }>(
        `${API_BASE_URL}/news/limit/3`,
        'Gagal mengambil berita terkini'
    );
    return json.data;
};

export const fetchNewsWithLimit = async (limit: number): Promise<NewsItem[]> => {
    const json = await fetchJson<{ data: NewsItem[] }>(
        `${API_BASE_URL}/news/limit/${limit}`,
        `Gagal mengambil ${limit} berita`
    );
    return json.data;
};

export const fetchNewsWithLimitAndLevel = async (limit: number, level: string): Promise<NewsItem[]> => {
    const json = await fetchJson<{ data: NewsItem[] }>(
        `${API_BASE_URL}/news/limit/${limit}/${level}`,
        `Gagal mengambil ${limit} berita untuk jenjang ${level}`
    );
    return json.data;
};

export const fetchProjects = async (): Promise<ProjectItem[]> => {
    const json = await fetchJson<{ data: ProjectItem[] }>(
        `${API_BASE_URL}/projects`,
        'Gagal mengambil data Project'
    );
    return json.data;
};

export const fetchProjectsWithLimit = async (limit: number): Promise<ProjectItem[]> => {
    const json = await fetchJson<{ data: ProjectItem[] }>(
        `${API_BASE_URL}/projects/limit/${limit}`,
        `Gagal mengambil ${limit} proyek`
    );
    return json.data;
};

export const fetchJournals = async (): Promise<JournalItem[]> => {
    const json = await fetchJson<{ data: JournalItem[] }>(
        `${API_BASE_URL}/journals`,
        'Gagal mengambil data Jurnal'
    );
    return json.data;
};

export const fetchJournalsWithLimit = async (limit: number): Promise<JournalItem[]> => {
    const json = await fetchJson<{ data: JournalItem[] }>(
        `${API_BASE_URL}/journals/limit/${limit}`,
        `Gagal mengambil ${limit} jurnal`
    );
    return json.data;
};

export const fetchBestJournals = async (): Promise<JournalItem[]> => {
    const json = await fetchJson<{ data: JournalItem[] }>(
        `${API_BASE_URL}/journals/best`,
        'Gagal mengambil data Jurnal Terbaik'
    );
    return json.data;
};

export const fetchFacilities = async (): Promise<Facility[]> => {
    const json = await fetchJson<{ data: Facility[] }>(
        `${API_BASE_URL}/facilities`,
        'Gagal mengambil data Fasilitas'
    );
    return json.data;
};

// DETAILS

export const fetchNewsDetail = async (id: string): Promise<NewsItem> => {
    const json = await fetchJson<{ data: NewsItem }>(
        `${API_BASE_URL}/news/${id}`,
        `Gagal mengambil detail Berita ${id}`
    );
    return json.data;
};

export const fetchProjectDetail = async (id: string): Promise<ProjectItem> => {
    const json = await fetchJson<{ data: ProjectItem }>(
        `${API_BASE_URL}/projects/${id}`,
        `Gagal mengambil detail Project ${id}`
    );
    return json.data;
};

export const fetchJournalDetail = async (id: string): Promise<JournalItem> => {
    const json = await fetchJson<{ data: JournalItem }>(
        `${API_BASE_URL}/journals/${id}`,
        `Gagal mengambil detail Jurnal ${id}`
    );
    return json.data;
};

export const fetchFacilityDetail = async (id: string): Promise<Facility> => {
    const json = await fetchJson<{ data: Facility }>(
        `${API_BASE_URL}/facilities/${id}`,
        `Gagal mengambil detail Fasilitas ${id}`
    );
    return json.data;
};

/* ================= CREATE/UPDATE/DELETE ================= */

export interface CreateNewsPayload {
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    jenjang: string;
    level?: string;
    main_image?: File;
    gallery?: File[];
}

export interface CreateNewsResponse {
    message: string;
    data: NewsItem;
}

export const createNews = async (payload: CreateNewsPayload): Promise<CreateNewsResponse> => {
    const formData = new FormData();

    // Add text fields
    formData.append('title', payload.title);
    formData.append('excerpt', payload.excerpt);
    formData.append('content', payload.content);
    formData.append('date', payload.date);
    formData.append('category', payload.category);
    formData.append('jenjang', payload.jenjang);

    if (payload.level) {
        formData.append('level', payload.level);
    }

    // Add main image
    if (payload.main_image) {
        formData.append('main_image', payload.main_image);
    }

    // Add gallery images
    if (payload.gallery && payload.gallery.length > 0) {
        payload.gallery.forEach((file) => {
            formData.append('gallery[]', file);
        });
    }

    const response = await fetch(`${API_BASE_URL}/api/news`, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
        // Don't set Content-Type header - browser will set it automatically with boundary
    });

    let data: any = null;
    try {
        data = await response.json();
    } catch {
        throw new Error('Gagal membuat berita: Response bukan JSON');
    }

    if (!response.ok) {
        throw new Error(
            data?.message || `Gagal membuat berita: (${response.status})`
        );
    }

    return data as CreateNewsResponse;
};

export interface CreateProjectPayload {
    title: string;
    category: string;
    description: string;
    author: string;
    date: string;
    jenjang: string;
    imageUrl?: File;
    documents?: File[];
    document_types?: string[];
    document_titles?: string[];
}

export interface CreateProjectResponse {
    message: string;
    data: ProjectItem;
}

export const createProject = async (payload: CreateProjectPayload): Promise<CreateProjectResponse> => {
    const formData = new FormData();

    // Add text fields
    formData.append('title', payload.title);
    formData.append('category', payload.category);
    formData.append('description', payload.description);
    formData.append('author', payload.author);
    formData.append('date', payload.date);
    formData.append('jenjang', payload.jenjang);

    // Add image
    if (payload.imageUrl) {
        formData.append('imageUrl', payload.imageUrl);
    }

    // Add documents with metadata
    if (payload.documents && payload.documents.length > 0) {
        payload.documents.forEach((file) => {
            formData.append('documents[]', file);
        });

        // Add document types
        if (payload.document_types && payload.document_types.length > 0) {
            payload.document_types.forEach((type) => {
                formData.append('document_types[]', type);
            });
        }

        // Add document titles
        if (payload.document_titles && payload.document_titles.length > 0) {
            payload.document_titles.forEach((title) => {
                formData.append('document_titles[]', title);
            });
        }
    }

    const response = await fetch(`${API_BASE_URL}/api/projects`, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    let data: any = null;
    try {
        data = await response.json();
    } catch {
        throw new Error('Gagal membuat proyek: Response bukan JSON');
    }

    if (!response.ok) {
        throw new Error(
            data?.message || `Gagal membuat proyek: (${response.status})`
        );
    }

    return data as CreateProjectResponse;
};

export interface CreateJournalPayload {
    title: string;
    category: string;
    abstract: string;
    author: string;
    mentor: string;
    score: number;
    date: string;
    jenjang: string;
    is_best: boolean;
    documentUrl?: File;
}

export interface CreateJournalResponse {
    message: string;
    data: JournalItem;
}

export const createJournal = async (payload: CreateJournalPayload): Promise<CreateJournalResponse> => {
    const formData = new FormData();

    // Add text fields
    formData.append('title', payload.title);
    formData.append('category', payload.category);
    formData.append('abstract', payload.abstract);
    formData.append('author', payload.author);
    formData.append('mentor', payload.mentor);
    formData.append('score', payload.score.toString());
    formData.append('date', payload.date);
    formData.append('jenjang', payload.jenjang);
    formData.append('is_best', payload.is_best ? '1' : '0');

    // Add PDF document if provided
    if (payload.documentUrl) {
        formData.append('documentUrl', payload.documentUrl);
    }

    const response = await fetch(`${API_BASE_URL}/api/journals`, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    let data: any = null;
    try {
        data = await response.json();
    } catch {
        throw new Error('Gagal membuat jurnal: Response bukan JSON');
    }

    if (!response.ok) {
        throw new Error(
            data?.message || `Gagal membuat jurnal: (${response.status})`
        );
    }

    return data as CreateJournalResponse;
};

// ==================== UPDATE FUNCTIONS ====================

export interface UpdateNewsPayload extends CreateNewsPayload {
    id: number;
}

export const updateNews = async (payload: UpdateNewsPayload): Promise<CreateNewsResponse> => {
    const formData = new FormData();

    // Add text fields
    formData.append('title', payload.title);
    formData.append('excerpt', payload.excerpt);
    formData.append('content', payload.content);
    formData.append('date', payload.date);
    formData.append('category', payload.category);
    formData.append('jenjang', payload.jenjang);

    if (payload.level) {
        formData.append('level', payload.level);
    }

    // Add main image if provided
    if (payload.main_image) {
        formData.append('main_image', payload.main_image);
    }

    // Add gallery images if provided
    if (payload.gallery && payload.gallery.length > 0) {
        payload.gallery.forEach((file) => {
            formData.append('gallery[]', file);
        });
    }

    // Laravel PUT/PATCH file upload workaround
    formData.append('_method', 'PUT');

    const response = await fetch(`${API_BASE_URL}/api/news/${payload.id}`, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    let data: any = null;
    try {
        data = await response.json();
    } catch {
        throw new Error('Gagal mengupdate berita: Response bukan JSON');
    }

    if (!response.ok) {
        throw new Error(
            data?.message || `Gagal mengupdate berita: (${response.status})`
        );
    }

    return data as CreateNewsResponse;
};

export interface UpdateProjectPayload extends CreateProjectPayload {
    id: number;
}

export const updateProject = async (payload: UpdateProjectPayload): Promise<CreateProjectResponse> => {
    const formData = new FormData();

    // Add text fields
    formData.append('title', payload.title);
    formData.append('category', payload.category);
    formData.append('description', payload.description);
    formData.append('author', payload.author);
    formData.append('date', payload.date);
    formData.append('jenjang', payload.jenjang);

    // Add image if provided
    if (payload.imageUrl) {
        formData.append('imageUrl', payload.imageUrl);
    }

    // Add documents with metadata if provided
    if (payload.documents && payload.documents.length > 0) {
        payload.documents.forEach((file) => {
            formData.append('documents[]', file);
        });

        if (payload.document_types && payload.document_types.length > 0) {
            payload.document_types.forEach((type) => {
                formData.append('document_types[]', type);
            });
        }

        if (payload.document_titles && payload.document_titles.length > 0) {
            payload.document_titles.forEach((title) => {
                formData.append('document_titles[]', title);
            });
        }
    }

    // Laravel PUT/PATCH file upload workaround
    formData.append('_method', 'PUT');

    const response = await fetch(`${API_BASE_URL}/api/projects/${payload.id}`, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    let data: any = null;
    try {
        data = await response.json();
    } catch {
        throw new Error('Gagal mengupdate proyek: Response bukan JSON');
    }

    if (!response.ok) {
        throw new Error(
            data?.message || `Gagal mengupdate proyek: (${response.status})`
        );
    }

    return data as CreateProjectResponse;
};

export interface UpdateJournalPayload extends CreateJournalPayload {
    id: number;
}

export const updateJournal = async (payload: UpdateJournalPayload): Promise<CreateJournalResponse> => {
    const formData = new FormData();

    // Add text fields
    formData.append('title', payload.title);
    formData.append('category', payload.category);
    formData.append('abstract', payload.abstract);
    formData.append('author', payload.author);
    formData.append('mentor', payload.mentor);
    formData.append('score', payload.score.toString());
    formData.append('date', payload.date);
    formData.append('jenjang', payload.jenjang);
    formData.append('is_best', payload.is_best ? '1' : '0');

    // Add PDF document if provided
    if (payload.documentUrl) {
        formData.append('documentUrl', payload.documentUrl);
    }

    // Laravel PUT/PATCH file upload workaround
    formData.append('_method', 'PUT');

    const response = await fetch(`${API_BASE_URL}/api/journals/${payload.id}`, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    let data: any = null;
    try {
        data = await response.json();
    } catch {
        throw new Error('Gagal mengupdate jurnal: Response bukan JSON');
    }

    if (!response.ok) {
        throw new Error(
            data?.message || `Gagal mengupdate jurnal: (${response.status})`
        );
    }

    return data as CreateJournalResponse;
};

// ==================== DELETE FUNCTIONS ====================

export interface DeleteResponse {
    message: string;
}

export const deleteNews = async (id: string | number): Promise<DeleteResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/news/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    });

    let data: any = null;
    try {
        data = await response.json();
    } catch {
        throw new Error('Gagal menghapus berita: Response bukan JSON');
    }

    if (!response.ok) {
        throw new Error(data?.message || `Gagal menghapus berita: (${response.status})`);
    }

    return data as DeleteResponse;
};

export const deleteProject = async (id: string | number): Promise<DeleteResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    });

    let data: any = null;
    try {
        data = await response.json();
    } catch {
        throw new Error('Gagal menghapus proyek: Response bukan JSON');
    }

    if (!response.ok) {
        throw new Error(data?.message || `Gagal menghapus proyek: (${response.status})`);
    }

    return data as DeleteResponse;
};

export const deleteJournal = async (id: string | number): Promise<DeleteResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/journals/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    });

    let data: any = null;
    try {
        data = await response.json();
    } catch {
        throw new Error('Gagal menghapus jurnal: Response bukan JSON');
    }

    if (!response.ok) {
        throw new Error(data?.message || `Gagal menghapus jurnal: (${response.status})`);
    }

    return data as DeleteResponse;
};
