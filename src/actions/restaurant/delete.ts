"use server"

import { verifySession } from "@/actions/permissions";
import { prisma } from "@/lib/db";
import { getTranslations } from "next-intl/server";

export async function deleteResto(id: number): Promise<{ status: number; data: any }> {
    const e = await getTranslations("Error")
  
    try {
      const session = await verifySession()
      if (!session?.data?.user) {
        return { status: 401, data: { message: e("unauthorized") } }
      }
  
      if (!id) {
        return { status: 400, data: { message: "Invalid id" } }
      }
  
      await prisma.restaurant.delete({
        where: { id },
      })
  
      return { status: 200, data: { message: "restaurant deleted successfully" } }
    } catch (error) {
      console.error("An error occurred in deleterestaurant:", error)
      return { status: 500, data: { message: e("error") } }
    }
  }
  