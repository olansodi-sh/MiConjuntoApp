import { create } from 'zustand';
import { useAuthStore } from '../features/login/store/auth.store';
import { baseApi } from '../api/base.api';

// Store principal de la aplicación
export const useAppStore = create(() => ({
  // Inicializar stores al arrancar la app
  initialize: async () => {
    // Restaurar token de autenticación
    await useAuthStore.getState().restoreToken();
    
    // Registrar callback para manejar errores de autenticación
    baseApi.setOnUnauthorizedCallback(async () => {
      const { logout } = useAuthStore.getState();
      if (logout) {
        try {
          await logout();
        } catch (error) {
          console.error('Error during logout:', error);
        }
      }
    });
  },
}));
