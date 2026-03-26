import { baseApi } from "../../../api/base.api";
import { Package, AccessAudit, Photo } from "../types/reception.types";

export class ReceptionApi {
  /**
   * Get all packages for the current resident
   */
  static async getMyPackages(): Promise<Package[]> {
    const response = await baseApi.getAxiosInstance().get<Package[]>('/v1/packages/my');
    return response.data;
  }

  /**
   * Get access/visit logs for the current resident/apartment
   */
  static async getAccessLogs(): Promise<AccessAudit[]> {
    const response = await baseApi.getAxiosInstance().get<AccessAudit[]>('/v1/access-audit');
    return response.data;
  }

  /**
   * Get photos for a specific package
   */
  static async getPackagePhotos(packageId: string): Promise<Photo[]> {
    const response = await baseApi.getAxiosInstance().get<Photo[]>(`/v1/packages/${packageId}/photos`);
    return response.data;
  }
}
