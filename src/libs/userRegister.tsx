import { error } from "console";    
import Email from "next-auth/providers/email";

export default async function userRegister(
    userName: string,
    userTelephone: string,
    userEmail: string,
    userPassword: string
) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userName,
            tel: userTelephone, 
            email: userEmail,
            password: userPassword,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to register");
    }

    return await response.json();
}
