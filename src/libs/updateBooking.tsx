// libs/updateBooking.ts
import { BookingItem } from "../../interfaces";

export const updateBooking = async (
  bookingId: string, 
  token: string, 
  updatedBookingData: Partial<BookingItem>
) => {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/bookings/${bookingId}`, {
      method: 'PUT', // Use PUT or PATCH depending on your API
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedBookingData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update booking');
    }

    return await response.json();
  } catch (error) {
    console.error('Booking update error:', error);
    throw error;
  }
};
