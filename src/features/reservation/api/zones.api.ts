
import { baseApi } from "../../../api/base.api";
import { ReservationZone } from "../reservation.types";

export class ZonesApi {
    /**
     * Get all common areas/zones son las reservables
     */
    static async getMyReservableZones(): Promise<ReservationZone[]> {
        const response = await baseApi.getAxiosInstance().get<ReservationZone[]>('/v1/common-areas');
        console.log('getMyReservableZones', response.data);
        return response.data;
    }

    /**
     * Get details for a specific zone
     */
    static async getZoneById(id: string): Promise<ReservationZone> {
        const response = await baseApi.getAxiosInstance().get<ReservationZone>(`/v1/common-areas/${id}`);
        return response.data;
    }

    /**
     * Get all common areas/zones
     */
    static async getMyCommonZones(): Promise<ReservationZone[]> {
        const response = await baseApi.getAxiosInstance().get<ReservationZone[]>('/v1/community-spaces');
        console.log('getMyCommonZones', response.data);
        return response.data;
    }

    /**
     * Get details for a specific community space
     */
    static async getMyCommonZonesById(id: string): Promise<ReservationZone> {
        const response = await baseApi.getAxiosInstance().get<ReservationZone>(`/v1/community-spaces/${id}`);
        return response.data;
    }
}