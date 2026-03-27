import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import EncryptedStorage from 'react-native-encrypted-storage';
import { AuthState } from '../types/auth.types';
import { AuthApi } from '../api/auth.api';
import { baseApi } from '../../../api/base.api';
import TokenManager from '../../../utils/token.manager';

// Persistence configuration using EncryptedStorage
const encryptedStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await EncryptedStorage.getItem(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await EncryptedStorage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await EncryptedStorage.removeItem(name);
  },
};

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

export const useAuthStore = create<AuthState & AuthActions & { rememberedUser: { user: string, type: 'employee' | 'resident' } | null }>()(
  persist(
    (set, _get) => ({
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
          const token = _get().accessToken;
          if (token) {
            baseApi.setAuthToken(token);
            TokenManager.setToken(token);
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
        } catch (error) {
          console.error('Error restoring session:', error);
          set({ isLoading: false, isAuthenticated: false, user: null, accessToken: null });
          TokenManager.clearToken();
          baseApi.removeAuthToken();
        }
      },
    }),
    {
      name: 'auth-encrypted-storage',
      storage: createJSONStorage(() => encryptedStorage),
      // Persist only what's necessary
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        rememberedUser: state.rememberedUser,
      }),
      // Rehydrate API and TokenManager headers
      onRehydrateStorage: (_state) => {
        return (hydratedState, error) => {
          if (error) {
            console.error('Hydration Error:', error);
          } else if (hydratedState?.accessToken) {
            baseApi.setAuthToken(hydratedState.accessToken);
            TokenManager.setToken(hydratedState.accessToken);
          }
        };
      },
    }
  )
);
