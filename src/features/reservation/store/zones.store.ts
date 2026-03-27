
import { create } from 'zustand';
import { ReservationZone } from '../reservation.types';
import { ZonesApi } from '../api/zones.api';
import { ReservationsApi } from '../api/reservations.api';

interface ZonesState {
    reservableZones: ReservationZone[];
    commonZones: ReservationZone[];
    myReservations: any[]; // User's personal reservations
    selectedZone: ReservationZone | null;
    isLoading: boolean;
    error: string | null;
}

interface ZonesActions {
    fetchZones: () => Promise<void>;
    fetchMyReservations: () => Promise<void>;
    fetchZoneById: (id: string) => Promise<ReservationZone | null>;
    setLoading: (loading: boolean) => void;
    clearError: () => void;
}

const initialState: ZonesState = {
    reservableZones: [],
    commonZones: [],
    myReservations: [],
    selectedZone: null,
    isLoading: false,
    error: null,
};

export const useZonesStore = create<ZonesState & ZonesActions>((set) => ({
    ...initialState,

    fetchZones: async () => {
        set({ isLoading: true, error: null });
        try {
            const [reservableZones, commonZones, myReservations] = await Promise.all([
                ZonesApi.getMyReservableZones(),
                ZonesApi.getMyCommonZones(),
                ReservationsApi.getMyReservations()
            ]);
            set({ reservableZones, commonZones, myReservations, isLoading: false });
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || 'Error al obtener zonas',
            });
        }
    },

    fetchMyReservations: async () => {
        try {
            const myReservations = await ReservationsApi.getMyReservations();
            set({ myReservations });
        } catch (error: any) {
            console.error('Error fetching my reservations:', error);
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
