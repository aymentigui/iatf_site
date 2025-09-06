"use server"

import { prisma } from "@/lib/db"
import { sendEmail, sendOptCode } from "../email"


function generateCode(length: number = 6) {
    return Math.floor(100000 + Math.random() * 900000).toString() // 6 chiffres
}

async function isUserBlocked(email: string): Promise<boolean> {
    const limitRecord = await prisma.otp_generation_limit.findUnique({
        where: { email }
    });

    // Vérifier si bloqué ET que la date de blocage n'est pas expirée
    return !!(limitRecord && limitRecord.blocked_until && limitRecord.blocked_until > new Date());
}

// Réinitialiser les limitations si nécessaire
// Réinitialiser les limitations si nécessaire
async function resetLimitationsIfNeeded(email: string) {
    const limitRecord = await prisma.otp_generation_limit.findUnique({
        where: { email }
    });

    if (limitRecord) {
        const now = new Date();
        const lastReset = new Date(limitRecord.last_reset);
        const hoursDiff = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60);
        
        // Réinitialiser après 24 heures OU si le blocage est expiré
        if (hoursDiff >= 24 || (limitRecord.blocked_until && limitRecord.blocked_until <= now)) {
            await prisma.otp_generation_limit.update({
                where: { email },
                data: { 
                    count: 0,
                    last_reset: now,
                    blocked_until: null
                }
            });
        }
    }
}

export async function createOtp(email: string) {
    try {
        // Vérifier si l'utilisateur est bloqué
        if (await isUserBlocked(email)) {
            const limitRecord = await prisma.otp_generation_limit.findUnique({
                where: { email }
            });
            
            if (limitRecord && limitRecord.blocked_until) {
                const now = new Date();
                const blockedUntil = new Date(limitRecord.blocked_until);
                const minutesLeft = Math.ceil((blockedUntil.getTime() - now.getTime()) / (1000 * 60));
                
                return { 
                    status: 429, 
                    message: `Trop de tentatives. Veuillez réessayer dans ${minutesLeft} minute(s).` 
                };
            }
            
            return { status: 429, message: "Trop de tentatives. Veuillez réessayer plus tard." };
        }

        // Réinitialiser les limitations si nécessaire
        await resetLimitationsIfNeeded(email);

        // Vérifier le nombre de générations
        const limitRecord = await prisma.otp_generation_limit.findUnique({
            where: { email }
        });

        if (limitRecord && limitRecord.count >= 3) {
            // Bloquer pour 15 minutes au lieu de 1 heure
            const blockedUntil = new Date(Date.now() + 15 * 60 * 1000);
            
            await prisma.otp_generation_limit.update({
                where: { email },
                data: { 
                    blocked_until: blockedUntil,
                    // Ne pas réinitialiser le compteur pour suivre le blocage
                }
            });
            
            return { 
                status: 429, 
                message: "Trop de tentatives. Veuillez réessayer dans 15 minutes." 
            };
        }

        const code = generateCode();
        const expiresAt = new Date(Date.now() + 1000 * 60 * 5); // expire dans 5min

        // Vérifier s'il existe déjà un OTP pour cet email
        const existingOtp = await prisma.contact_otp.findFirst({
            where: { email }
        });

        await prisma.contact_otp.deleteMany({
            where: { email }
        });

        // Créer le nouveau code OTP
        const otpData: any = {
            code,
            expires_at: expiresAt,
            email,
            attempts: 0
        };

        // Si un OTP existait déjà, incrémenter le compteur de génération
        if (existingOtp) {
            otpData.generation_count = existingOtp.generation_count + 1;
            
            // Bloquer si déjà 3 générations (ce cas ne devrait normalement pas se produire
            // car c'est géré par otp_generation_limit, mais on garde cette sécurité)
            if (existingOtp.generation_count >= 3) {
                return { 
                    status: 429, 
                    message: "Vous avez déjà demandé trop de codes. Veuillez réessayer dans 15 minutes." 
                };
            }
        } else {
            otpData.generation_count = 1;
        }

        await prisma.contact_otp.create({
            data: otpData
        });

        // Mettre à jour le compteur de générations
        if (limitRecord) {
            await prisma.otp_generation_limit.update({
                where: { email },
                data: { 
                    count: limitRecord.count + 1,
                    last_reset: new Date()
                }
            });
        } else {
            await prisma.otp_generation_limit.create({
                data: {
                    email,
                    count: 1
                }
            });
        }

        // Envoi email
        await sendOptCode({
            email,
            code
        });

        // Informer l'utilisateur du nombre de tentatives restantes
        const remainingAttempts = 3 - (limitRecord ? limitRecord.count + 1 : 1);
        
        return { 
            status: 200, 
            message: `Code envoyé. Il vous reste ${remainingAttempts} tentative(s).` 
        };
    } catch (error) {
        console.error("Error creating OTP:", error);
        return { status: 500, message: "Erreur lors de la génération du code." };
    }
}

export async function verifyOtp(email: string, code: string) {
    try {
        // Trouver le code OTP valide pour cet email
        const otp = await prisma.contact_otp.findFirst({
            where: { 
                email, 
                expires_at: { gt: new Date() },
                used: false
            }
        });

        if (!otp) {
            return { status: 400, message: "Code invalide ou expiré." };
        }

        // Vérifier le nombre de tentatives
        if (otp.attempts >= 3) {
            return { status: 429, message: "Trop de tentatives. Veuillez demander un nouveau code." };
        }

        // Vérifier si le code correspond
        if (otp.code !== code) {
            // Incrémenter le compteur de tentatives
            await prisma.contact_otp.update({
                where: { id: otp.id },
                data: { attempts: otp.attempts + 1 }
            });

            const remainingAttempts = 3 - (otp.attempts + 1);
            
            let message = `Code incorrect. Il vous reste ${remainingAttempts} tentative(s).`;
            
            if (remainingAttempts === 0) {
                message = "Code incorrect. Plus de tentatives disponibles. Veuillez demander un nouveau code.";
            }
            
            return { status: 400, message };
        }

        // Marquer le code comme utilisé
        await prisma.contact_otp.update({
            where: { id: otp.id },
            data: { used: true }
        });

        return { status: 200, message: "Vérification réussie" };
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return { status: 500, message: "Erreur lors de la vérification du code." };
    }
}

export async function resendOtp(email: string) {
    try {
        // Vérifier si l'utilisateur est bloqué
        if (await isUserBlocked(email)) {
            const limitRecord = await prisma.otp_generation_limit.findUnique({
                where: { email }
            });
            
            if (limitRecord && limitRecord.blocked_until) {
                const now = new Date();
                const blockedUntil = new Date(limitRecord.blocked_until);
                const minutesLeft = Math.ceil((blockedUntil.getTime() - now.getTime()) / (1000 * 60));
                
                return { 
                    status: 429, 
                    message: `Trop de tentatives. Veuillez réessayer dans ${minutesLeft} minute(s).` 
                };
            }
            
            return { status: 429, message: "Trop de tentatives. Veuillez réessayer plus tard." };
        }

        // Réinitialiser les limitations si nécessaire
        await resetLimitationsIfNeeded(email);

        // Vérifier le nombre de générations
        const limitRecord = await prisma.otp_generation_limit.findUnique({
            where: { email }
        });

        if (limitRecord && limitRecord.count >= 3) {
            // Bloquer pour 15 minutes
            const blockedUntil = new Date(Date.now() + 15 * 60 * 1000);
            
            await prisma.otp_generation_limit.update({
                where: { email },
                data: { 
                    blocked_until: blockedUntil
                }
            });
            
            return { 
                status: 429, 
                message: "Trop de tentatives. Veuillez réessayer dans 15 minutes." 
            };
        }

        // Trouver l'OTP existant
        const existingOtp = await prisma.contact_otp.findFirst({
            where: { email }
        });

        if (!existingOtp) {
            return { status: 400, message: "Aucun code à renvoyer. Veuillez demander un nouveau code." };
        }

        // Vérifier si déjà 3 générations
        if (existingOtp.generation_count >= 3) {
            return { 
                status: 429, 
                message: "Vous avez déjà demandé trop de codes. Veuillez réessayer dans 15 minutes." 
            };
        }

        // Générer un nouveau code
        const newCode = generateCode();
        const expiresAt = new Date(Date.now() + 1000 * 60 * 5); // expire dans 5min

        // Mettre à jour l'OTP existant
        await prisma.contact_otp.update({
            where: { id: existingOtp.id },
            data: {
                code: newCode,
                expires_at: expiresAt,
                attempts: 0,
                generation_count: existingOtp.generation_count + 1
            }
        });

        // Mettre à jour le compteur de générations
        if (limitRecord) {
            await prisma.otp_generation_limit.update({
                where: { email },
                data: { 
                    count: limitRecord.count + 1,
                    last_reset: new Date()
                }
            });
        } else {
            await prisma.otp_generation_limit.create({
                data: {
                    email,
                    count: 1
                }
            });
        }

        // Envoyer le nouveau code par email
        await sendOptCode({
            email,
            code: newCode
        });

        // Informer l'utilisateur du nombre de tentatives restantes
        const remainingAttempts = 3 - (limitRecord ? limitRecord.count + 1 : 1);
        
        return { 
            status: 200, 
            message: `Code renvoyé. Il vous reste ${remainingAttempts} tentative(s).` 
        };
    } catch (error) {
        console.error("Error resending OTP:", error);
        return { status: 500, message: "Erreur lors de l'envoi du code." };
    }
}

// Fonction pour nettoyer les anciennes limitations (à exécuter périodiquement)
// Fonction pour nettoyer les anciennes limitations (à exécuter périodiquement)
export async function cleanupOtpLimitations() {
    try {
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const now = new Date();
        
        // Supprimer les limitations expirées (plus de 24h ou blocage expiré)
        await prisma.otp_generation_limit.deleteMany({
            where: {
                OR: [
                    { last_reset: { lt: yesterday } },
                    { blocked_until: { lt: now } }
                ]
            }
        });

        // Supprimer les OTP expirés
        await prisma.contact_otp.deleteMany({
            where: {
                expires_at: { lt: new Date() }
            }
        });
    } catch (error) {
        console.error("Error cleaning up OTP limitations:", error);
    }
}