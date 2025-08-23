"use server"

import { getTranslations } from "next-intl/server"
import { prisma } from "@/lib/db"
import { verifySession } from "../permissions";

export async function getContactMessages(): Promise<{ status: number; data: any }> {
  const e = await getTranslations("Error")

  try {
    const session = await verifySession()
    if (!session?.data?.user) {
      return { status: 401, data: { message: e("unauthorized") } }
    }

    const [messages, total] = await Promise.all([
      prisma.contact.findMany({
      }),
      prisma.restaurant.count(),
    ])

    return {
      status: 200,
      data: {
        restaurants: messages,
        total,
      },
    }
  } catch (error) {
    console.error("An error occurred in getmessages:", error)
    return { status: 500, data: { message: e("error") } }
  }
}