
import { getRestos } from "@/actions/restaurant/get"
import { createRestaurant } from "@/actions/restaurant/set"
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

    const result = await getRestos(filters)

    return NextResponse.json(result.data, { status: result.status })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    let image = formData.get("file") as unknown as File;
    const data = {
      nomfr: formData.get("nomfr") as string,
      nomen: formData.get("nomen") as string,
      nomar: formData.get("nomar") as string,
      nompt: formData.get("nompt") as string,
      nomes: formData.get("nomes") as string,
      descriptionfr: formData.get("descriptionfr") as string,
      descriptionen: formData.get("descriptionen") as string,
      descriptionar: formData.get("descriptionar") as string,
      descriptionpt: formData.get("descriptionpt") as string,
      descriptiones: formData.get("descriptiones") as string,
      adressefr: formData.get("adressefr") as string,
      adresseen: formData.get("adresseen") as string,
      adressear: formData.get("adressear") as string,
      adressept: formData.get("adressept") as string,
      adressees: formData.get("adressees") as string,
      email: formData.get("email") as string,
      telephone: formData.get("telephone") as string,
      site_web: formData.get("site_web") as string,
      statut: formData.get("statut") as string,
      type_cuisinefr: formData.get("type_cuisinefr") as string,
      type_cuisineen: formData.get("type_cuisineen") as string,
      type_cuisinear: formData.get("type_cuisinear") as string,
      type_cuisinept: formData.get("type_cuisinept") as string,
      type_cuisinees: formData.get("type_cuisinees") as string,
      prix_moyen: formData.get("prix_moyen") ? Number.parseFloat(formData.get("prix_moyen") as string) : undefined,
      horaires_ouverture: formData.get("horaires_ouverture") as string,
      latitude: formData.get("latitude") as string,
      longitude: formData.get("longitude") as string,
      specialitesfr: formData.get("specialitesfr") as string,
      specialitesen: formData.get("specialitesen") as string,
      specialitesar: formData.get("specialitesar") as string,
      specialitespt: formData.get("specialitespt") as string,
      specialiteses: formData.get("specialiteses") as string,
      image: image ? image : undefined,
    }

    const result = await createRestaurant(data)
    return NextResponse.json(result.data, { status: result.status })
  } catch (error) {
    return NextResponse.json({ message: "Invalid request data" }, { status: 400 })
  }
}
