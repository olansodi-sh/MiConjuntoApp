export interface ReservationZone {
  id: number;
  name: string;
  hasform: boolean;
  description: string;
  image: string;
  rules: string[];
}

export interface ReservationZonesByType {
  reservations: ReservationZone[];
  commons: ReservationZone[];
}

export interface ReservationTabParams {
  zones: ReservationZone[];
}
