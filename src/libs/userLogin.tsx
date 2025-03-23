import { error } from "console";    
import Email from "next-auth/providers/email";

export default async function userLogin(userEmail:string, userPassword:string) {
    const response = await fetch("http://localhost:5000/api/v1/auth/login" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        })
    })
    if (!response.ok) {
        throw new Error("Failed to log-in")
    }

    // const userData = await response.json();
    // console.log("API Response JSON:", userData); // Debugging

    return await response.json()
}