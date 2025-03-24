import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


export default async function getAllBookings() {
    // Simulate a delay (optional, for testing purposes)
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const session = await getServerSession(authOptions);

    // Make the POST request to the API
    try {
        const response = await fetch("http://localhost:5000/api/v1/bookings",{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session?.user.token}`, // ใส่ token ที่ได้
                "Content-Type": "application/json"
        }}
    );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${errorText}`);
        }

        const data = await response.json();
        console.log(data)
        return data.data ; 
    } catch (err) {
        console.error('Booking creation failed:', err);
        throw err; 
    }
}
