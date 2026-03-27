
import { create } from 'zustand';
import { News } from '../types/news.types';
import { NewsApi } from '../api/news.api';

interface NewsState {
    newsList: News[];
    selectedNews: News | null;
    isLoading: boolean;
    error: string | null;
}

interface NewsActions {
    fetchNews: () => Promise<void>;
    fetchNewsById: (id: string | number) => Promise<News | null>;
    setLoading: (loading: boolean) => void;
    clearError: () => void;
}

const initialState: NewsState = {
    newsList: [],
    selectedNews: null,
    isLoading: false,
    error: null,
};

export const useNewsStore = create<NewsState & NewsActions>((set) => ({
    ...initialState,

    fetchNews: async () => {
        set({ isLoading: true, error: null });
        try {
            const newsList = await NewsApi.getNews();
            // Ensure newsList is an array to prevent crashes
            set({ newsList: Array.isArray(newsList) ? newsList : [], isLoading: false });
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || 'Error al obtener noticias',
            });
        }
    },

    fetchNewsById: async (id: string | number) => {
        set({ isLoading: true, error: null });
        try {
            const news = await NewsApi.getNewsById(id);
            set({ selectedNews: news, isLoading: false });
            return news;
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || 'Error al obtener detalle de la noticia',
            });
            return null;
        }
    },

    setLoading: (loading: boolean) => set({ isLoading: loading }),
    clearError: () => set({ error: null }),
}));
