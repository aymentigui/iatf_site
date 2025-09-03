"use server"
import { verifySession } from "@/actions/permissions";
import { prisma } from "@/lib/db";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { sendConfirmationBusRequest, sendConfirmationMessage, sendEmail } from "../email";
import { verifyOtp } from "./otp";

export async function createContactMessage(data: any): Promise<{ status: number; data: any }> {
    const e = await getTranslations("Error")
  
    try {
      const schema = z.object({
        name: z.string().min(1, "Name is required"),
        subject: z.string().min(1, "Subject is required"),
        email: z.string().email("Invalid email address"),
        phone: z.string().optional(),
        message: z.string().min(1, "Message is required"),
        hotel: z.string().optional(),
        country: z.string().optional(),
        otpCode: z.string().min(6, "OTP code is required") // Ajouter le champ OTP
      });
  
      const result = schema.safeParse(data);
  
      if (!result.success) {
        return { status: 400, data: { errors: result.error.errors } };
      }
  
      const { name, subject, phone, email, message, hotel, country, otpCode } = result.data;
  
      // Vérifier le code OTP
      const otpVerification = await verifyOtp(email, otpCode);
      
      if (otpVerification.status !== 200) {
        return { status: otpVerification.status, data: { message: otpVerification.message } };
      }
  
      // Créer le contact si le OTP est valide
      const contact = await prisma.contact.create({
        data: {
          name, subject, phone, email, message, hotel, country
        }
      });
  
      await sendConfirmationMessage({
        email,
        name,
        subject,
        phone,
        message
      });
  
      await sendConfirmationMessage({
        email: "rima.kerirem@gmail.com",
        name,
        subject,
        phone,
        message
      });
  
      return { status: 200, data: contact };
    } catch (error) {
      console.error("An error occurred in createContactMessage:", error);
      return { status: 500, data: { message: e("error") } };
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
    const e = await getTranslations("Error");

    try {
        // Validation des données avec Zod
        const schema = z.object({
            name: z.string().min(1, "Name is required"),
            email: z.string().email("Invalid email address"),
            phone: z.string().optional(),
            urgence: z.string().min(1, "Urgency level is required"),
            hotel: z.string().optional(),
            country: z.string().optional(),
            otpCode: z.string().min(6, "OTP code is required") // Ajout de la validation OTP
        });

        const result = schema.safeParse(data);

        if (!result.success) {
            return { 
                status: 400, 
                data: { 
                    errors: result.error.errors.map(error => ({
                        field: error.path.join('.'),
                        message: error.message
                    }))
                } 
            };
        }

        const { name, phone, email, urgence, country, hotel, otpCode } = result.data;

        // Vérification du code OTP avec le nouveau système
        const otpVerification = await verifyOtp(email, otpCode);
        
        if (otpVerification.status !== 200) {
            return { 
                status: otpVerification.status, 
                data: { message: otpVerification.message } 
            };
        }

        // Vérifier si une demande similaire existe déjà récemment (pour éviter les doublons)
        const recentRequest = await prisma.bus_request.findFirst({
            where: {
                email,
                created_at: {
                    gte: new Date(Date.now() - 30 * 60 * 1000) // Dans les 30 dernières minutes
                }
            }
        });

        if (recentRequest) {
            return { 
                status: 409, 
                data: { 
                    message: "Une demande a déjà été soumise récemment avec cet email. Veuillez patienter avant de soumettre une nouvelle demande." 
                } 
            };
        }

        // Création de la demande de bus
        const busRequest = await prisma.bus_request.create({
            data: {
                name, 
                urgence, 
                phone, 
                email, 
                country, 
                hotel
            }
        });

        // Envoi des emails de confirmation
        try {
            await sendConfirmationBusRequest({
                email,
                name,
                phone: phone || "Non fourni",
                urgence,
                hotel: hotel || "Non spécifié",
                country: country || "Non spécifié"
            });

            await sendConfirmationBusRequest({
                email: "rima.kerirem@gmail.com",
                name,
                phone: phone || "Non fourni",
                urgence,
                hotel: hotel || "Non spécifié",
                country: country || "Non spécifié",
                isAdmin: true // Ajouter un flag pour l'email admin si nécessaire
            });
        } catch (emailError) {
            console.error("Erreur lors de l'envoi des emails:", emailError);
            // Ne pas échouer la requête à cause d'une erreur d'email
        }

        return { 
            status: 200, 
            data: { 
                message: "Demande de bus créée avec succès",
                request: busRequest
            } 
        };
    } catch (error) {
        console.error("An error occurred in createBusRequest:", error);
        return { 
            status: 500, 
            data: { 
                message: e("error"),
            } 
        };
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
