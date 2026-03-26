import { baseApi } from "../../../api/base.api";
import { LoginResponse, User } from "../types/auth.types";

export class AuthApi {
  /**
   * Login for employees (admins)
   */
  static async loginEmployee(credentials: { username: string; password: string }): Promise<LoginResponse> {
    const response = await baseApi.getAxiosInstance().post<LoginResponse>('/v1/auth/login/employee', credentials);
    return response.data;
  }

  /**
   * Login for residents
   */
  static async loginResident(credentials: { identifier: string; password: string }): Promise<LoginResponse> {
    const response = await baseApi.getAxiosInstance().post<LoginResponse>('/v1/auth/login/resident', credentials);
    return response.data;
  }

  /**
   * Get current session info
   */
  static async getMe(): Promise<User> {
    const response = await baseApi.getAxiosInstance().get<User>('/v1/auth/me');
    return response.data;
  }

  /**
   * Logout user session (Client-side only as per API docs)
   */
  static async logout(): Promise<void> {
    // No logout endpoint exists on server, we only clear local state
    console.log('Logging out (Client-side)...');
  }

  /**
   * Refresh the access token
   */
  static async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
      const response = await baseApi.getAxiosInstance().post<{ accessToken: string }>('/v1/auth/refresh', {
          refreshToken,
      });
      return response.data;
}

  /**
   * Update FCM token for push notifications
   */
  static async updateFcmToken(fcmToken: string): Promise<void> {
    await baseApi.getAxiosInstance().put('/v1/auth/fcm-token', { fcmToken });
  }
}