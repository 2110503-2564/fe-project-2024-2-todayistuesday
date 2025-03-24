import { error } from "console";
import { BookingItem } from "../../interfaces";
import { Dayjs } from "dayjs";

export default async function addBooking(
  cid: string, 
  bookingData: object, 
  sessionToken: string // Add session token as a parameter
) {
    

    // Make the POST request to the API
    try {
        const response = await fetch(`http://localhost:5000/api/v1/hotels/${cid}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken}` // Use passed token
            },
            body: JSON.stringify(bookingData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${errorText}`);
        }

        const data = await response.json();
        return data; // Return the booking data
    } catch (err) {
        console.error('Booking creation failed:', err);
        throw err; // Re-throw the error for caller to handle
    }
}
