
export interface News {
  id: string | number;
  title?: string;
  description?: string;
  fullDescription?: string;
  image?: string;
  date?: string;
  category?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsResponse {
  news: News[];
}
