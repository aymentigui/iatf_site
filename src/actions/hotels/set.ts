"use server"
import { uploadFileDB } from "@/actions/localstorage/upload-db";
import { verifySession } from "@/actions/permissions";
import { prisma } from "@/lib/db";
import { getTranslations } from "next-intl/server";

export async function createhotel(data: any): Promise<{ status: number; data: any }> {
    const e = await getTranslations("Error")

    try {
        const session = await verifySession()
        if (!session?.data?.user) {
            return { status: 401, data: { message: e("unauthorized") } }
        }

        let file_id = null
        if (data.image && data.image instanceof File && data.image.size > 0) {
            const file = await uploadFileDB(data.image, session.data.user.id);
            if (file.status === 200) {
                file_id = file.data.file.id;
            }
        }

        const { dataUpdate, image } = data

        const hotel = await prisma.hotels.create({
            data: {
                image_url: file_id,
                ...dataUpdate
            },
        })

        return { status: 200, data: { message: "hotels created" } }
    } catch (error) {
        console.error("An error occurred in createRestaurant:", error)
        return { status: 500, data: { message: e("error") } }
    }
}




export async function createhotels(data: any) {
    //const t = await getTranslations("hotels");
    const t = await getTranslations("System");
    const s = await getTranslations("System");
    const e = await getTranslations('Error');

    try {
        const session = await verifySession()
        if (!session || session.status != 200) {
            return { status: 401, data: { message: e('unauthorized') } }
        }

        const hotels = data.map(async (userData: any) => {
            return await addOnehotels(userData, t, s);
        })

        const resuls = await Promise.all(hotels);

        return { status: 200, data: { message: s("createsuccess"), hotels: resuls } };
    } catch (error) {
        //@ts-ignore
        console.error("An error occurred in createhotels" + error.message);
        return { status: 500, data: { message: s("createfail") } };
    }
}

const addOnehotels = async (data: any, t: any, s: any) => {
    try {

        const hotel = await prisma.hotels.create({
            data: {
              ...data
            },
        })
        return { status: 200, data: data };
    } catch (error) {
        // @ts-ignore
        console.error("An error occurred in addOnehotel" + error.message);
        return { status: 500, data: { message: s("createfail"), hotel: data } }
    };
}
