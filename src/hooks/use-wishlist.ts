"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "@/services/api/wishlist";
import { WishlistItem } from "@/types/wishlist";

export const useWishlist = () => {
  const { tokens, isAuthenticated } = useAuth();

  return useQuery<WishlistItem[], Error>({
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(),
    enabled: isAuthenticated,
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => addToWishlist({ productId }),
    onSuccess: (newItem) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Added to Wishlist", {
        description: `${newItem.product.name} has been added to your wishlist.`,
      });
    },
    onError: (error) => {
      toast.error("Error", {
        description: "Could not add item to wishlist. Please try again.",
      });
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (wishlistItemId: number) =>
      removeFromWishlist({ wishlistItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Removed from Wishlist", {
        description: "The item has been removed from your wishlist.",
      });
    },
    onError: (error) => {
      toast.error("Error", {
        description: "Could not remove item from wishlist. Please try again.",
      });
    },
  });
};
