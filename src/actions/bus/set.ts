"use server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { getTranslations } from "next-intl/server"



export async function CreateBusRequest2(data: any) {
    try {

        const t = await getTranslations()
        
        const busRequestSchema = z.object({
            name: z.string().min(2, t('form.name.error')).optional().or(z.literal("")),
            hotel: z.string().min(2, t('form.hotel.error')).optional().or(z.literal("")),
            date: z.string().min(1, t('form.date.error')),
            time: z.string().min(1, t('form.time.error')),
        })
        
        type BusRequestFormData = z.infer<typeof busRequestSchema>
        // Validation avec Zod
        const validatedData = busRequestSchema.parse(data)

        // Conversion des chaînes de date/heure en objets DateTime
        const dateTime = new Date(`${validatedData.date}T${validatedData.time}`)
        const timeOnly = new Date(`1970-01-01T${validatedData.time}`)

        // Création de la demande de bus
        const busRequest = await prisma.bus_request2.create({
            data: {
                name: validatedData.name || null,
                hotel: validatedData.hotel || null,
                date: new Date(validatedData.date),
                time: timeOnly,
            },
        })

        return {
            status: 200,
            data: { message: "Demande de bus créée avec succès" },
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                status: 400,
                data: { message: "Données invalides", errors: error.errors },
            }
        }

        console.error("Erreur lors de la création de la demande:", error)
        return {
            status: 500,
            data: { message: "Erreur interne du serveur" },
        }
    }
}



