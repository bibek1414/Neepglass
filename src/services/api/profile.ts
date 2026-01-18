import { getApiBaseUrl } from "@/config/site";
import { createHeadersCustomer } from "@/utils/headers";
import { handleApiError } from "@/utils/api-error";
import { ProfileFormValues } from "@/schemas/customer/profile.form";

export const profileApi = {
  getProfile: async (): Promise<ProfileFormValues & { id: number }> => {
    const API_BASE_URL = getApiBaseUrl();
    const response = await fetch(`${API_BASE_URL}/api/customer/detail/`, {
      method: "GET",
      headers: createHeadersCustomer(),
    });

    await handleApiError(response);
    return response.json();
  },

  updateProfile: async (
    data: Partial<ProfileFormValues>,
  ): Promise<{ message: string; data: ProfileFormValues }> => {
    const API_BASE_URL = getApiBaseUrl();
    const response = await fetch(`${API_BASE_URL}/api/customer/detail/`, {
      method: "PATCH",
      headers: createHeadersCustomer(),
      body: JSON.stringify(data),
    });

    await handleApiError(response);
    return response.json();
  },
};
