export interface ReservationZone {
  id: string | number;
  name: string;
  hasform?: boolean;
  description?: string;
  image?: string;
  rules?: string[];
  maxCapacity?: number;
  phase?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface ReservationZonesByType {
  reservations: ReservationZone[];
  commons: ReservationZone[];
}

export interface ReservationTabParams {
  zones: ReservationZone[];
}
