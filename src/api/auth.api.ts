import { baseApi, ApiResponse } from './base.api';

// Interfaces for Auth
export interface UserProfile {
    id: string;
    name: string;
    lastName: string;
    username: string;
    type: string;
    role: string;
    roleLabel: string;
    permissions: string[];
}

export interface LoginResponse {
    accessToken: string;
    user: UserProfile;
}

export interface EmployeeLoginParams {
    username: string;
    password: string;
}

export interface ResidentLoginParams {
    identifier: string;
    password: string;
}

class AuthApi {
    /**
     * Login for Employees (Admins)
     */
    async loginEmployee(params: EmployeeLoginParams): Promise<ApiResponse<LoginResponse>> {
        try {
            // Path relative to BASE_URL in base.api.ts: https://api-conjunto.nordikhat.com/api
            const response = await baseApi.post<LoginResponse>('v1/auth/login/employee', params);
            
            // If success, we set the token globally in baseApi (which updates TokenManager)
            if (response.success && response.data.accessToken) {
                baseApi.setAuthToken(response.data.accessToken);
            }
            
            return response;
        } catch (error) {
            console.error('Error logging in employee:', error);
            throw error;
        }
    }

    /**
     * Login for Residents
     */
    async loginResident(params: ResidentLoginParams): Promise<ApiResponse<LoginResponse>> {
        try {
            const response = await baseApi.post<LoginResponse>('v1/auth/login/resident', params);
            
            if (response.success && response.data.accessToken) {
                baseApi.setAuthToken(response.data.accessToken);
            }
            
            return response;
        } catch (error) {
            console.error('Error logging in resident:', error);
            throw error;
        }
    }

    /**
     * Get current user info (requires being logged in)
     */
    async getMe(): Promise<ApiResponse<any>> {
        try {
            return await baseApi.get('v1/auth/me');
        } catch (error) {
            console.error('Error getting user profile:', error);
            throw error;
        }
    }

    /**
     * Logout
     */
    logout(): void {
        baseApi.removeAuthToken();
    }
}

export const authApi = new AuthApi();
export default authApi;
