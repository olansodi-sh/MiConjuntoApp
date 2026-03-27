
import { baseApi } from "../../../api/base.api";

export interface ReservationPayload {
  residentId: string;
  areaId: string;
  reservationDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  statusId: string;
  notesByAdministrator?: string;
  notesByResident: string;
}

export interface ReservationStatus {
    id: string;
    code: string;
    name: string;
    description: string;
    isActive: boolean;
}

export class ReservationsApi {
    /**
     * Get all possible reservation statuses
     */
    static async getStatuses(): Promise<ReservationStatus[]> {
        const response = await baseApi.getAxiosInstance().get<ReservationStatus[]>('/v1/reservation-statuses');
        return response.data;
    }

    /**
     * Create a new reservation
     */
    static async createReservation(payload: ReservationPayload): Promise<any> {
        const response = await baseApi.getAxiosInstance().post('/v1/reservations', payload);
        return response.data;
    }

    /**
     * Get current resident's reservations
     */
    static async getMyReservations(): Promise<any[]> {
        const response = await baseApi.getAxiosInstance().get<any[]>('/v1/reservations/my');
        return response.data;
    }
}
