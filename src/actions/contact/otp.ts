"use server"

import { prisma } from "@/lib/db"
import { sendEmail, sendOptCode } from "../email"


function generateCode(length: number = 6) {
    return Math.floor(100000 + Math.random() * 900000).toString() // 6 chiffres
}

export async function createOtp(email: string) {
    const code = generateCode()
    const expiresAt = new Date(Date.now() + 1000 * 60 * 5) // expire dans 5min

    await prisma.contact_otp.deleteMany({
        where: {
            email,
        }
    })
    // Sauvegarde en DB
    await prisma.contact_otp.create({
        data: {
            code,
            expires_at: expiresAt,
            email
        }
    })

    // Envoi email
    await sendOptCode({
        email,
        code
    })

    return { status: 200, message: "Code envoyé" }
}

export async function verifyOtp(email: string, code: string) {
    const otp = await prisma.contact_otp.findFirst({
        where: {
            email,
            code,
            used: false,
            expires_at: { gt: new Date() }
        }
    })

    if (!otp) {
        return { status: 400, message: "Code invalide ou expiré" }
    }

    // Marquer OTP utilisé
    await prisma.contact_otp.update({
        where: { id: otp.id },
        data: { used: true }
    })

    return { status: 200, message: "Vérification réussie" }
}

export async function resendOtp(email: string) {
    const otp = await prisma.contact_otp.deleteMany({
        where: {
            email
        }
    })

    const result = await createOtp(email)
    return result
}

