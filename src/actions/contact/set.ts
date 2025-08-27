"use server"
import { verifySession } from "@/actions/permissions";
import { prisma } from "@/lib/db";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { sendConfirmationBusRequest, sendConfirmationMessage, sendEmail } from "../email";

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

        const otp_code= await prisma.contact_otp.findFirst({
            where: { email, used: true, expires_at: { gt: new Date() } }
        })
        if (!otp_code) {
            return { status: 400, data: { message: "Otp expired" } }
        }
        await prisma.contact_otp.deleteMany({
            where: { email }
        })

        const contact=await prisma.contact.create(
            {
                data: {
                    name, subject, phone, email, message
                }
            }
        )

        await sendConfirmationMessage({
            email,
            name,
            subject,
            phone,
            message
        })

        await sendConfirmationMessage({
            email:"rima.kerirem@gmail.com",
            name,
            subject,
            phone,
            message
        })        

        return { status: 200, data: contact }
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


export async function createBusRequest(data: any): Promise<{ status: number; data: any }> {
    const e = await getTranslations("Error")

    try {

        const shema = z.object({
            name: z.string().min(1, "Name is required"),
            email: z.string().email("Invalid email address"),
            phone: z.string().optional(),
            urgence: z.string(),
            hotel: z.string().optional(),
            country: z.string().optional(),
        });

        const result = shema.safeParse(data);

        if (!result.success) {
            //console.log(result.error.errors);
            return { status: 400, data: { errors: result.error.errors } };
        }

        const { name, phone, email, urgence, country, hotel } = result.data

        const otp_code= await prisma.contact_otp.findFirst({
            where: { email, used: true, expires_at: { gt: new Date() } }
        })
        if (!otp_code) {
            return { status: 400, data: { message: "Otp expired" } }
        }
        await prisma.contact_otp.deleteMany({
            where: { email }
        })

        const contact=await prisma.bus_request.create(
            {
                data: {
                    name, urgence, phone, email, country, hotel
                }
            }
        )

        await sendConfirmationBusRequest({
            email,
            name,
            phone,
            urgence,
            hotel,
            country
        })

        await sendConfirmationBusRequest({
            email:"rima.kerirem@gmail.com",
            name,
            phone,
            urgence,
            hotel,
            country
        })

        
        return { status: 200, data: contact }
    } catch (error) {
        console.error("An error occurred in createRestaurant:", error)
        return { status: 500, data: { message: e("error") } }
    }
}



export async function busRequestOpen(id: string): Promise<{ status: number; data: any }> {
    const e = await getTranslations("Error")

    try {
        const session = await verifySession()
        if (!session?.data?.user) {
            return { status: 401, data: { message: e("unauthorized") } }
        }

        const message = await prisma.bus_request.update({
            where: { id },
            data: {
                viewed: true
            }
        })

        return { status: 200, data: message }
    } catch (error) {
        console.error("An error occurred in busRequestOpen:", error)
        return { status: 500, data: { message: e("error") } }
    }
}
