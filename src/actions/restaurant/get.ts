"use server"

import { getTranslations } from "next-intl/server"
import { prisma } from "@/lib/db"
import { verifySession } from "../permissions";

export async function getRestos(filters?: any): Promise<{ status: number; data: any }> {
  const e = await getTranslations("Error")

  try {
    const session = await verifySession()
    if (!session?.data?.user) {
      return { status: 401, data: { message: e("unauthorized") } }
    }

    const { search, statut, page, limit } = filters

    const where: any = {}

    if (search) {
      where.OR = [
        { nomfr: { contains: search } },
        { nomar: { contains: search } },
        { nomen: { contains: search } },
        { nomes: { contains: search } },
        { nompt: { contains: search } },
      ]
    }

    if (statut && statut !== "0") where.statut = statut

    const skip = (page - 1) * limit

    const [restaurants, total] = await Promise.all([
      prisma.restaurant.findMany({
        where,
        orderBy: { date_creation: "desc" },
        skip: limit === -1 ? undefined : skip,
        take: limit === -1 ? undefined : limit,
      }),
      prisma.restaurant.count({ where }),
    ])

    return {
      status: 200,
      data: {
        restaurants: (restaurants.map((resto) => ({
          ...resto,
          latitude: resto.latitude ? resto.latitude.toString() : "",
          longitude: resto.longitude ? resto.longitude.toString() : "",
          date_creation: "",
          date_modification: "",
          prix_moyen: resto.prix_moyen ? resto.prix_moyen.toString() : "",
        }))),
        total,
        page,
        limit,
        totalPages: limit === -1 ? 1 : Math.ceil(total / limit),
      },
    }
  } catch (error) {
    console.error("An error occurred in getrestaurants:", error)
    return { status: 500, data: { message: e("error") } }
  }
}

export async function getResto(id: number): Promise<{ status: number; data: any }> {
  const e = await getTranslations("Error")

  try {
    if (!id) {
      return { status: 400, data: { message: "Invalid id" } }
    }

    const resto = await prisma.restaurant.findUnique({
      where: { id },
    })

    if (!resto) {
      return { status: 404, data: { message: e("notfound") } }
    }

    return { status: 200, data: {
      ...resto,
      latitude: resto.latitude ? resto.latitude.toString() : "",
      longitude: resto.longitude ? resto.longitude.toString() : "",
      date_creation: "",
      date_modification: "",
      prix_moyen: resto.prix_moyen ? resto.prix_moyen.toString() : "",
    } }
  } catch (error) {
    console.error("An error occurred in getresto:", error)
    return { status: 500, data: { message: e("error") } }
  }
}