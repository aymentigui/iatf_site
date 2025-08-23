"use server"

import { prisma } from "@/lib/db"
import { sendEmail } from "../email"


function generateCode(length: number = 6) {
    return Math.floor(100000 + Math.random() * 900000).toString() // 6 chiffres
}

export async function createOtp(contactId: string, email: string) {
    const code = generateCode()
    const expiresAt = new Date(Date.now() + 1000 * 60 * 5) // expire dans 5min

    // Sauvegarde en DB
    await prisma.contact_otp.create({
        data: {
            code,
            expires_at: expiresAt,
            contact_id: contactId,
        }
    })

    // Envoi email
    await sendEmail(
        email,
        "Votre code de vérification",
        `Votre code est ${code}. Il expire dans 5 minutes.`,
    )

    return { status: 200, message: "Code envoyé" }
}

export async function verifyOtp(contactId: string, code: string) {
    const otp = await prisma.contact_otp.findFirst({
        where: {
            contact_id: contactId,
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

    // Marquer le contact comme vérifié
    await prisma.contact.update({
        where: { id: contactId },
        data: { verified: true }
    })

    return { status: 200, message: "Vérification réussie" }
}

export async function resendOtp(contactId: string) {
    const contact = await prisma.contact.findUnique({ where: { id: contactId } })
    if (!contact) return { status: 404, message: "Contact introuvable" }

    return await createOtp(contact.id, contact.email)
}
