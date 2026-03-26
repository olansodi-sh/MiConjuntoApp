import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import TokenManager from '../utils/token.manager';


// Configuración base de la API
export const MEDIA_URL = 'https://api-conjunto.nordikhat.com'; // URL base para archivos multimedia
const BASE_URL = `${MEDIA_URL}/api`; // URL del endpoint real
const TIMEOUT = 10000; // 10 segundos

// Tipos para las respuestas de la API
export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    errors?: string[];
}

export interface ApiError {
    message: string;
    status?: number;
    errors?: string[];
}
// Clase principal para manejar las peticiones HTTP
class BaseApi {
    private axiosInstance: AxiosInstance;
    private onUnauthorizedCallback: (() => void) | null = null;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: BASE_URL,
            timeout: TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    // Configuración de interceptores
    private setupInterceptors(): void {
        // Interceptor de request
        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                // Aquí puedes agregar el token de autenticación
                const token = this.getAuthToken();

                // Agregar token si está disponible
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                // Log de la petición (solo en desarrollo)
                if (__DEV__) {
                }

                return config;
            },
            (error: AxiosError) => {
                console.error('❌ Request Error:', error);
                return Promise.reject(error);
            }
        );

        // Interceptor de response
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                // Log de la respuesta (solo en desarrollo)
                if (__DEV__) {
                }

                return response;
            },
            (error: AxiosError) => {
                // Manejo de errores global
                const apiError = this.handleError(error);

                // Si el error es 401 (Unauthorized), hacer logout y redirigir al login
                if (error.response?.status === 401) {
                    console.warn('⚠️ Unauthorized (401), logging out...');
                    this.handleUnauthorized();
                }

                if (__DEV__) {
                    console.error('❌ API Error:', {
                        status: error.response?.status,
                        url: error.config?.url,
                        message: apiError.message,
                        data: error.response?.data,
                    });
                }

                return Promise.reject(apiError);
            }
        );
    }

    // Método para obtener el token de autenticación
    private getAuthToken(): string | null {
        const token = TokenManager.getToken();
        return token;
    }

    // Método para manejar errores de autenticación (401 o sin token)
    private handleUnauthorized(): void {
        // Limpiar token de la API
        this.removeAuthToken();

        // Llamar al callback si está registrado
        if (this.onUnauthorizedCallback) {
            this.onUnauthorizedCallback();
        }
    }

    // Método para registrar callback cuando hay error de autenticación
    setOnUnauthorizedCallback(callback: () => void): void {
        this.onUnauthorizedCallback = callback;
    }

    // Método para manejar errores
    private handleError(error: AxiosError): ApiError {
        if (error.response) {
            // El servidor respondió con un código de error
            const { status, data } = error.response;

            return {
                message: (data as any)?.message || `Error ${status}`,
                status,
                errors: (data as any)?.errors || [],
            };
        } else if (error.request) {
            // La petición se hizo pero no se recibió respuesta
            return {
                message: 'No se pudo conectar con el servidor',
                status: 0,
            };
        } else {
            // Algo pasó al configurar la petición
            return {
                message: error.message || 'Error desconocido',
            };
        }
    }

    // Métodos HTTP básicos
    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.axiosInstance.get(url, config);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            throw error;
        }
    }

    async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.axiosInstance.post(url, data, config);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            throw error;
        }
    }

    async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.axiosInstance.put(url, data, config);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            throw error;
        }
    }

    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.axiosInstance.delete(url, config);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            throw error;
        }
    }

    async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.axiosInstance.patch(url, data, config);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            throw error;
        }
    }

    // Método para actualizar el token de autenticación
    setAuthToken(token: string): void {
        TokenManager.setToken(token);
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Método para remover el token de autenticación
    removeAuthToken(): void {
        TokenManager.clearToken();
        delete this.axiosInstance.defaults.headers.common['Authorization'];
    }

    // Método para obtener la instancia de axios (para casos especiales)
    getAxiosInstance(): AxiosInstance {
        return this.axiosInstance;
    }
}

// Instancia singleton de la API
export const baseApi = new BaseApi();

// Exportar la clase para casos donde necesites múltiples instancias
export default BaseApi;
