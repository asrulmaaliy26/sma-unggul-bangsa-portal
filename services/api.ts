import { HomeData, CategoryData } from '../types';

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
