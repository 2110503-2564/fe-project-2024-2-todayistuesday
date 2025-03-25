export async function getBookings(token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch booking');
    }

    return response.json();
}
