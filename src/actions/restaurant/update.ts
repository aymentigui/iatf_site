"use server"

import { deleteFileDb } from "@/actions/localstorage/delete-db";
import { uploadFileDB } from "@/actions/localstorage/upload-db";
import { verifySession } from "@/actions/permissions";
import { prisma } from "@/lib/db";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export async function updateResto(id: number, data: any): Promise<{ status: number; data: any }> {
  const e = await getTranslations("Error")

  try {
    const session = await verifySession()
    if (!session?.data?.user) {
      return { status: 401, data: { message: e("unauthorized") } }
    }

    if (!id) {
      return { status: 400, data: { message: "Invalid id" } }
    }

    const existing = await prisma.restaurant.findUnique({ where: { id } })

    if (!existing) {
      return { status: 404, data: { message: "Restaurant not found" } }
    }
    let file_id = null
    if (existing.image_id && data.is_image===true) {
      await deleteFileDb(existing.image_id);
    }else{
      file_id = existing.image_id;
    }
    if (data.image && data.image instanceof File && data.image.size > 0) {
      const file = await uploadFileDB(data.image, session.data.user.id);
      if (file.status === 200) {
        file_id = file.data.file.id;
      }
    }

    const {image, is_image, ...dataUpdate}=data 

    await prisma.restaurant.update({
      where: { id },
      data: {
        ...dataUpdate,
        image_id: file_id,
      },
    })

    return { status: 200, data: "resto updated" }
  } catch (error) {
    console.error("An error occurred in updateresto:", error)
    return { status: 500, data: { message: e("error") } }
  }
}
