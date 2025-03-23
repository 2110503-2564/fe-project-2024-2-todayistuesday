import { error } from "console";
import { BookingItem } from "../../interfaces";
import { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";


export default async function addBooking(
    hotelId: string,
    nameLastname: string,
    tel: string,
    checkIn: Dayjs,
    checkOut: Dayjs,
) {
    // Simulate a delay (optional, for testing purposes)
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const { data: session, status } = useSession();
    // Make the POST request to the API
    if (session) {
        const response = await fetch(`http://localhost:5000/api/v1/hotels/${hotelId}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${session.user.token}` // Add this line
            },
            body: JSON.stringify({
                nameLastname,
                tel,
                checkIn,
                checkOut,
            }),
        });
        // Check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to add booking");
        }

        // Parse and return the response JSON
        return await response.json();
    }
    
    
}
