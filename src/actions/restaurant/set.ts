"use server"
import { uploadFileDB } from "@/actions/localstorage/upload-db";
import { verifySession } from "@/actions/permissions";
import { prisma } from "@/lib/db";
import { getTranslations } from "next-intl/server";

export async function createRestaurant(data: any): Promise<{ status: number; data: any }> {
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

        const restaurant = await prisma.restaurant.create({
            data: {
                image_id: file_id,
                ...dataUpdate
            },
        })

        return { status: 200, data: { message: "restaurant created" } }
    } catch (error) {
        console.error("An error occurred in createRestaurant:", error)
        return { status: 500, data: { message: e("error") } }
    }
}




export async function createRestaurants(data: any) {
    //const t = await getTranslations("restaurants");
    const t = await getTranslations("System");
    const s = await getTranslations("System");
    const e = await getTranslations('Error');

    try {
        const session = await verifySession()
        if (!session || session.status != 200) {
            return { status: 401, data: { message: e('unauthorized') } }
        }

        const restaurants = data.map(async (userData: any) => {
            return await addOneRestaurant(userData, t, s);
        })

        const resuls = await Promise.all(restaurants);

        return { status: 200, data: { message: s("createsuccess"), restaurants: resuls } };
    } catch (error) {
        //@ts-ignore
        console.error("An error occurred in createrestaurants" + error.message);
        return { status: 500, data: { message: s("createfail") } };
    }
}

const addOneRestaurant = async (data: any, t: any, s: any) => {
    try {

        const restaurant = await prisma.restaurant.create({
            data: {
              ...data
            },
        })
        return { status: 200, data: data };
    } catch (error) {
        // @ts-ignore
        console.error("An error occurred in addOneResto" + error.message);
        return { status: 500, data: { message: s("createfail"), restaurant: data } }
    };
}
