export async function getBookings(token: string) {
    const response = await fetch(`http://localhost:5000/api/v1/bookings`, {
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
