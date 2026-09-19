"use server";

import { backendClient } from "@/sanity/lib/backendClient";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    if (!orderId || !newStatus) {
      throw new Error("Missing orderId or newStatus");
    }

    await backendClient
      .patch(orderId)
      .set({ status: newStatus })
      .commit();

    revalidatePath("/orders");

    return { success: true };
  } catch (error) {
    console.error("Error updating order status in Sanity:", error);
    return { success: false, error: "Failed to update status" };
  }
}