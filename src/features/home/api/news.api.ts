
import { baseApi } from "../../../api/base.api";
import { News } from "../types/news.types";

export class NewsApi {
    /**
     * Get all news
     */
    static async getNews(): Promise<News[]> {
        const response = await baseApi.get<News[]>('/v1/news');
        return response.data;
    }

    /**
     * Get news by ID
     */
    static async getNewsById(id: string | number): Promise<News> {
        const response = await baseApi.get<News>(`/v1/news/${id}`);
        return response.data;
    }
}
