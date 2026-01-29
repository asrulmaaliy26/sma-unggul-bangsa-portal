import { HomeData, CategoryData, LevelConfigData } from '../types';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const fetchHomeData = async (): Promise<HomeData> => {
    const response = await fetch(`${API_BASE_URL}/home`);
    if (!response.ok) {
        throw new Error('Failed to fetch home data');
    }
    return response.json();
};

export const fetchCategories = async (): Promise<CategoryData> => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return response.json();
};

export const fetchProjectCategories = async (): Promise<string[]> => {
    const data = await fetchCategories();
    return data.project_categories;
};

export const fetchJournalCategories = async (): Promise<string[]> => {
    const data = await fetchCategories();
    return data.journal_categories;
};

export const fetchNewsCategories = async (): Promise<string[]> => {
    const data = await fetchCategories();
    return data.news_categories;
};

export const fetchLevelConfig = async (): Promise<LevelConfigData> => {
    const response = await fetch(`${API_BASE_URL}/jenjang`);
    if (!response.ok) {
        throw new Error('Failed to fetch level config');
    }
    return response.json();
};
