"use server"
import { uploadFileDB } from "@/actions/localstorage/upload-db";
import { verifySession } from "@/actions/permissions";
import { prisma } from "@/lib/db";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

export async function createContactMessage(data: any): Promise<{ status: number; data: any }> {
    const e = await getTranslations("Error")

    try {

        const shema= z.object({
            nom: z.string().min(1, "Name is required"),
            subject: z.string().min(1, "Subject is required"),
            email: z.string().email("Invalid email address"),
            message: z.string().min(1, "Message is required"),
        });

        const validatedData = shema.parse(data);

        if(!validatedData) {
            return { status: 400, data: { message: "" } }
        }

        return { status: 200, data: { message: "restaurant created" } }
    } catch (error) {
        console.error("An error occurred in createRestaurant:", error)
        return { status: 500, data: { message: e("error") } }
    }
}
