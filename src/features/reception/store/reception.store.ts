import { create } from 'zustand';
import { ReceptionState, Photo } from '../types/reception.types';
import { ReceptionApi } from '../api/reception.api';
import { MEDIA_URL } from '../../../api/base.api';

interface ReceptionActions {
  fetchPackages: () => Promise<void>;
  fetchAccessLogs: () => Promise<void>;
  fetchPackagePhotos: (packageId: string) => Promise<Photo[]>;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
}

const initialState: ReceptionState = {
  packages: [],
  accessLogs: [],
  selectedPackagePhotos: [],
  isLoading: false,
  error: null,
};

export const useReceptionStore = create<ReceptionState & ReceptionActions>((set) => ({
  ...initialState,

  fetchPackages: async () => {
    set({ isLoading: true, error: null });
    try {
      const packages = await ReceptionApi.getMyPackages();
      set({ packages, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Error al obtener paquetes',
      });
      console.error('Packages Fetch Error:', error);
    }
  },

  fetchAccessLogs: async () => {
    set({ isLoading: true, error: null });
    try {
      const accessLogs = await ReceptionApi.getAccessLogs();
      set({ accessLogs, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Error al obtener ingresos',
      });
      console.error('Access Logs Fetch Error:', error);
    }
  },

  fetchPackagePhotos: async (packageId: string) => {
    try {
      const resp = await ReceptionApi.getPackagePhotos(packageId);
      const mappedPhotos = resp.map((p: any) => {
        let fullUrl = p.url;
        if (p.filePath) {
          fullUrl = p.filePath.startsWith('http')
            ? p.filePath
            : `${MEDIA_URL}${p.filePath.startsWith('/') ? '' : '/'}${p.filePath}`;
        }
        return {
          ...p,
          url: fullUrl,
        };
      });

      console.log('Mapped Photos:', mappedPhotos);
      set({ selectedPackagePhotos: mappedPhotos });
      return mappedPhotos;
    } catch (error: any) {
      console.error('Package Photos Fetch Error:', error);
      return [];
    }
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),
  clearError: () => set({ error: null }),
}));
