import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";
export async function init() {
    try {

        const existingUser = await prisma.user.findFirst({
            where: { username: "admin" },
        });
        if (existingUser) {
            return;
        }

        const hashedPassword = await bcrypt.hash("kjasdkjasdnasdm", 10);
        await prisma.user.create({
            data: {
                firstname: "admin",
                lastname: "admin",
                username: "admin",
                email: "admin@transtev.com",
                password: hashedPassword,
                is_admin: true,
                public: false,
            },
        });
        //console.log("Admin user created successfully");
    } catch (error) {
        //console.error("An error occurred in init: ", error);
    }
}
