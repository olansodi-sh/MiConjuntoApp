
export interface Zone {
    id: string;
    name: string;
    description: string;
    image?: string;
    rules?: string[];
    hasForm: boolean;
    isReservable: boolean;
    capacity?: number;
    status?: string;
    createdAt?: string;
}

export interface ZonesState {
    zones: Zone[];
    reservableZones: Zone[];
    commonZones: Zone[];
    selectedZone: Zone | null;
    isLoading: boolean;
    error: string | null;
}
