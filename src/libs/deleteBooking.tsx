"use client";
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const deleteBooking = async (bookingId: string, token: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete booking');
    }

    return await response.json();
  } catch (error) {
    console.error('Booking deletion error:', error);
    throw error;
  }
};

// Optional: React component for delete button
export function DeleteBookingButton({ bookingId }: { bookingId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!session?.user?.token) {
      alert('You must be logged in to delete a booking');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    
    if (confirmDelete) {
      try {
        setIsDeleting(true);
        await deleteBooking(bookingId, session.user.token);
        alert('Booking deleted successfully');
        router.push('/bookings'); // Redirect after deletion
      } catch (error) {
        alert('Failed to delete booking');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isDeleting}
    >
      {isDeleting ? 'Deleting...' : 'Delete Booking'}
    </button>
  );
}
