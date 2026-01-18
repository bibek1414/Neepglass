import { useMutation, useQuery } from "@tanstack/react-query";
import { contactAPI } from "@/services/api/contact";
import {
  ContactFormData,
  PaginatedContacts,
  ContactFilters,
  ContactFormSubmission,
} from "@/types/contact";
import { toast } from "sonner";

export const useGetContacts = (filters: ContactFilters = {}) => {
  return useQuery<PaginatedContacts>({
    queryKey: ["contacts", filters],
    queryFn: () => contactAPI.getContacts(filters),
  });
};

export const useSubmitContactForm = () => {
  return useMutation({
    mutationFn: (data: ContactFormSubmission) => {
      // Transform ContactFormSubmission to ContactFormData format
      const contactData: ContactFormData = {
        name: data.name,
        email: data.email || undefined,
        phone_number: data.phone_number || undefined,
        message: data.message,
      };

      return contactAPI.createContact(contactData);
    },
    onError: (error) => {
      console.error("Failed to submit contact form:", error);
    },
  });
};
