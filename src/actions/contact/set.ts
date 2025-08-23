"use server"
import { verifySession } from "@/actions/permissions";
import { prisma } from "@/lib/db";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

export async function createContactMessage(data: any): Promise<{ status: number; data: any }> {
    const e = await getTranslations("Error")

    try {

        const shema = z.object({
            name: z.string().min(1, "Name is required"),
            subject: z.string().min(1, "Subject is required"),
            email: z.string().email("Invalid email address"),
            phone: z.string().optional(),
            message: z.string().min(1, "Message is required"),
        });

        const result = shema.safeParse(data);

        if (!result.success) {
            //console.log(result.error.errors);
            return { status: 400, data: { errors: result.error.errors } };
        }

        const { name, subject, phone, email, message } = result.data

        await prisma.contact.create(
            {
                data: {
                    name, subject, phone, email, message
                }
            }
        )

        return { status: 200, data: { message: "restaurant created" } }
    } catch (error) {
        console.error("An error occurred in createRestaurant:", error)
        return { status: 500, data: { message: e("error") } }
    }
}


export async function messageOpen(id: string): Promise<{ status: number; data: any }> {
    const e = await getTranslations("Error")

    try {
        const session = await verifySession()
        if (!session?.data?.user) {
            return { status: 401, data: { message: e("unauthorized") } }
        }

        const message = await prisma.contact.update({
            where: { id },
            data: {
                viewed: true
            }
        })

        return { status: 200, data: message }
    } catch (error) {
        console.error("An error occurred in messageOpen:", error)
        return { status: 500, data: { message: e("error") } }
    }
}
