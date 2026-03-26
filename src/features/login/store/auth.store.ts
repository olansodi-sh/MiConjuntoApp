import { create } from 'zustand';
import { AuthState } from '../types/auth.types';
import { AuthApi } from '../api/auth.api';
import { baseApi } from '../../../api/base.api';
import TokenManager from '../../../utils/token.manager';

// NOTE: Should install @react-native-async-storage/async-storage for persistence
// For now we use the memory-only TokenManager

interface AuthActions {
  loginEmployee: (credentials: { username: string; password: string }, remember?: boolean) => Promise<void>;
  loginResident: (credentials: { identifier: string; password: string }, remember?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  restoreToken: () => Promise<void>;
  clearError: () => void;
  setRememberedUser: (data: { user: string, type: 'employee' | 'resident' } | null) => void;
}

const initialState: AuthState & { rememberedUser: { user: string, type: 'employee' | 'resident' } | null } = {
  ...{
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  rememberedUser: null,
};

export const useAuthStore = create<AuthState & AuthActions & { rememberedUser: { user: string, type: 'employee' | 'resident' } | null }>((set, _get) => ({
  ...initialState,

  // Login for Employees
  loginEmployee: async (credentials, remember = false) => {
    set({ isLoading: true, error: null });
    try {
      const response = await AuthApi.loginEmployee(credentials);
      const { user, accessToken } = response;

      baseApi.setAuthToken(accessToken);
      TokenManager.setToken(accessToken);

      if (remember) {
        set({ rememberedUser: { user: credentials.username, type: 'employee' } });
      }

      set({
        user,
        accessToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Error en el login',
      });
      throw error;
    }
  },

  // Login for Residents
  loginResident: async (credentials, remember = false) => {
    set({ isLoading: true, error: null });
    try {
      const response = await AuthApi.loginResident(credentials);
      const { user, accessToken } = response;

      baseApi.setAuthToken(accessToken);
      TokenManager.setToken(accessToken);

      if (remember) {
        set({ rememberedUser: { user: credentials.identifier, type: 'resident' } });
      }

      set({
        user,
        accessToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Error en el login',
      });
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await AuthApi.logout();
    } catch (error) {
      console.error('Error during logout state cleanup:', error);
    } finally {
      baseApi.removeAuthToken();
      TokenManager.clearToken();
      set({ ...initialState });
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  setRememberedUser: (data) => set({ rememberedUser: data }),

  // Restore session
  restoreToken: async () => {
    set({ isLoading: true });
    try {
      const token = TokenManager.getToken();
      if (token) {
        baseApi.setAuthToken(token);
        const user = await AuthApi.getMe();
        set({
          user,
          accessToken: token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false, isAuthenticated: false });
    }
  },
}));
