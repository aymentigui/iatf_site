import { notFound } from "next/navigation"
import { Detail } from "../_components/detail"
import { gethotel } from "@/actions/hotels/get"


export default async function ItemPage({ params }: any) {
    const paramsId = await params
    const result = await gethotel(Number(paramsId.id))


    if (result.status === 404) {
        notFound()
    }

    if (result.status !== 200) {
        throw new Error("Failed to fetch item")
    }

    const filtreddata= {
        ...result.data,
        latitude: result.data.latitude ? result.data.latitude.toString() : "",
        longitude: result.data.longitude ? result.data.longitude.toString() : "",
        date_creation: "",
        date_modification: "",
        distance: result.data.distance ? result.data.distance.toString() : "",
        prix_min: result.data.prix_min ? result.data.prix_min.toString() : "",
        prix_max: result.data.prix_max ? result.data.prix_max.toString() : "",
    }

    return (
        <div className="container mx-auto py-6">
            <Detail item={filtreddata} />
        </div>
    )
}
