"use server"

import { getTranslations } from "next-intl/server"
import { prisma } from "@/lib/db"
import { verifySession } from "../permissions";

export async function getHotels(filters?: any): Promise<{ status: number; data: any }> {
  const e = await getTranslations("Error")

  try {

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

    const [hotels, total] = await Promise.all([
      prisma.hotels.findMany({
        where,
        orderBy: { date_creation: "desc" },
        skip: limit === -1 ? undefined : skip,
        take: limit === -1 ? undefined : limit,
      }),
      prisma.hotels.count({ where }),
    ])

    return {
      status: 200,
      data: {
        hotels: hotels.map((hotel) => ({
          ...hotel,
          latitude: hotel.latitude ? hotel.latitude.toString() : "",
          longitude: hotel.longitude ? hotel.longitude.toString() : "",
          date_creation: "",
          date_modification: "",
          distance: hotel.distance ? hotel.distance.toString() : "",
          prix_min: hotel.prix_min ? hotel.prix_min.toString() : "",
          prix_max: hotel.prix_max ? hotel.prix_max.toString() : "",
          tempestimer: hotel.tempestimer? hotel.tempestimer.toString() : "",
        })
        ),
        total,
        page,
        limit,
        totalPages: limit === -1 ? 1 : Math.ceil(total / limit),
      },
    }
  } catch (error) {
    console.error("An error occurred in gethotels:", error)
    return { status: 500, data: { message: e("error") } }
  }
}

export async function gethotel(id: number): Promise<{ status: number; data: any }> {
  const e = await getTranslations("Error")

  try {
    if (!id) {
      return { status: 400, data: { message: "Invalid id" } }
    }

    const hotel = await prisma.hotels.findUnique({
      where: { id },
    })

    if (!hotel) {
      return { status: 404, data: { message: e("notfound") } }
    }

    return { status: 200, data: {
      ...hotel,
      latitude: hotel.latitude ? hotel.latitude.toString() : "",
      longitude: hotel.longitude ? hotel.longitude.toString() : "",
      date_creation: "",
      date_modification: "",
      distance: hotel.distance ? hotel.distance.toString() : "",
      prix_min: hotel.prix_min ? hotel.prix_min.toString() : "",
      prix_max: hotel.prix_max ? hotel.prix_max.toString() : "",
      tempestimer: hotel.tempestimer ? hotel.tempestimer.toString() : "",
    } }
  } catch (error) {
    console.error("An error occurred in gethotel:", error)
    return { status: 500, data: { message: e("error") } }
  }
}