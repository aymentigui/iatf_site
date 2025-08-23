
import { getHotels } from "@/actions/hotels/get"
import { createhotel } from "@/actions/hotels/set"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filters = {
      search: searchParams.get("search") || undefined,
      statut: (searchParams.get("statut") as string) || undefined,
      page: searchParams.get("page") ? Number.parseInt(searchParams.get("page")!) : 1,
      limit: searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 25,
    }

    const result = await getHotels(filters)

    return NextResponse.json(result.data, { status: result.status })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("file") as File | null

    const data = {
      nom_fr: formData.get("nom_fr") as string | null,
      nom_ar: formData.get("nom_ar") as string | null,
      nom_en: formData.get("nom_en") as string | null,
      nom_es: formData.get("nom_es") as string | null,
      nom_pt: formData.get("nom_pt") as string | null,
      description_fr: formData.get("description_fr") as string | null,
      description_en: formData.get("description_en") as string | null,
      description_ar: formData.get("description_ar") as string | null,
      description_es: formData.get("description_es") as string | null,
      description_pt: formData.get("description_pt") as string | null,
      adresse_fr: formData.get("adresse_fr") as string | null,
      adresse_en: formData.get("adresse_en") as string | null,
      adresse_ar: formData.get("adresse_ar") as string | null,
      adresse_es: formData.get("adresse_es") as string | null,
      adress_pt: formData.get("adress_pt") as string | null,
      email: formData.get("email") as string | null,
      telephone: formData.get("telephone") as string | null,
      site_web: formData.get("site_web") as string | null,
      statut: (formData.get("statut") as string) || "actif",
      etoiles: formData.get("etoiles") ? Number(formData.get("etoiles")) : null,
      prix_min: formData.get("prix_min") ? Number.parseFloat(formData.get("prix_min") as string) : null,
      prix_max: formData.get("prix_max") ? Number.parseFloat(formData.get("prix_max") as string) : null,
      latitude: formData.get("latitude") ? Number.parseFloat(formData.get("latitude") as string) : null,
      longitude: formData.get("longitude") ? Number.parseFloat(formData.get("longitude") as string) : null,
      image_url: image ? image.name : null, // si tu veux stocker juste le nom/fichier
      services_fr: formData.get("services_fr") as string | null,
      services_en: formData.get("services_en") as string | null,
      services_ar: formData.get("services_ar") as string | null,
      services_es: formData.get("services_es") as string | null,
      services_pt: formData.get("services_pt") as string | null,
      zone_fr: formData.get("zone_fr") as string | null,
      zone_ar: formData.get("zone_ar") as string | null,
      zone_en: formData.get("zone_en") as string | null,
      zone_es: formData.get("zone_es") as string | null,
      zone_pt: formData.get("zone_pt") as string | null,
      quai_fr: formData.get("quai_fr") as string | null,
      quai_ar: formData.get("quai_ar") as string | null,
      quai_en: formData.get("quai_en") as string | null,
      quai_es: formData.get("quai_es") as string | null,
      quai_pt: formData.get("quai_pt") as string | null,
      distance: formData.get("distance") ? Number.parseFloat(formData.get("distance") as string) : null,
      tempestimer: formData.get("tempestimer") as string | null,
    }

    const result = await createhotel(data)
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Invalid request data" }, { status: 400 })
  }
}
