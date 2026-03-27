
import { create } from 'zustand';
import { ReservationZone } from '../reservation.types';
import { ZonesApi } from '../api/zones.api';

interface ZonesState {
    reservableZones: ReservationZone[];
    commonZones: ReservationZone[];
    selectedZone: ReservationZone | null;
    isLoading: boolean;
    error: string | null;
}

interface ZonesActions {
    fetchZones: () => Promise<void>;
    fetchZoneById: (id: string) => Promise<ReservationZone | null>;
    setLoading: (loading: boolean) => void;
    clearError: () => void;
}

const initialState: ZonesState = {
    reservableZones: [],
    commonZones: [],
    selectedZone: null,
    isLoading: false,
    error: null,
};

export const useZonesStore = create<ZonesState & ZonesActions>((set) => ({
    ...initialState,

    fetchZones: async () => {
        set({ isLoading: true, error: null });
        try {
            const reservableZones = await ZonesApi.getMyReservableZones();
            const commonZones = await ZonesApi.getMyCommonZones();
            set({ reservableZones, commonZones, isLoading: false });
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || 'Error al obtener zonas',
            });
        }
    },

    fetchZoneById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const zone = await ZonesApi.getZoneById(id);
            set({ selectedZone: zone, isLoading: false });
            return zone;
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || 'Error al obtener detalle de la zona',
            });
            return null;
        }
    },

    setLoading: (loading: boolean) => set({ isLoading: loading }),
    clearError: () => set({ error: null }),
}));
