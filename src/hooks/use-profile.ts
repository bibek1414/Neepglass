import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "@/services/api/profile";
import { ProfileFormValues } from "@/schemas/customer/profile.form";
import { toast } from "sonner";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => profileApi.getProfile(),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<ProfileFormValues>) =>
      profileApi.updateProfile(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success(response.message || "Profile updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
};
