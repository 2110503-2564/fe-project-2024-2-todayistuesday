"use client"
import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeReservation } from "@/redux/features/cartSlice";
import { useSession } from "next-auth/react";
import { deleteBooking } from "@/libs/deleteBooking";
import { BookingItem } from "../../../../interfaces";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReservationCart() {
    const router = useRouter();
    const { data: session } = useSession();
    const carItems = useAppSelector((state) => state.cartSlice.carItems);
    const dispatch = useDispatch<AppDispatch>();
    const [error, setError] = useState<string | null>(null);

    const handleRemoveReservation = async (bookItem: BookingItem) => {
        // Detailed logging for debugging
        console.log('Booking Item:', bookItem);
        console.log('Session User:', session?.user);

        // Comprehensive checks for booking removal
        if (!bookItem._id) {
            console.error('Booking ID is missing');
            setError('Booking ID is missing');
            return;
        }

        if (!session?.user) {
            console.error('User session is not available');
            setError('Please log in to remove bookings');
            return;
        }

        if (!session.user.token) {
            console.error('User authentication token is missing');
            setError('Authentication token is missing. Please log in again.');
            return;
        }

        try {
            // Attempt to delete booking from backend
            console.log(bookItem._id)
            await deleteBooking(bookItem._id, session.user.token);
            
            // Remove from Redux store if backend deletion is successful
            dispatch(removeReservation(bookItem));
            
            // Clear any previous errors
            setError(null);
        } catch (error) {
            console.error('Booking deletion failed:', error);
            setError('Failed to remove booking. Please try again.');
        }
    };

    const handleEditReservation = (bookItem: BookingItem) => {
        // Navigate to edit page with booking details
        router.push(`/reservations/edit/${bookItem._id}?hotel=${encodeURIComponent(bookItem.hotel)}`);
    };

    // Filter bookings to show only the current user's bookings
    const userBookings = carItems

    return (
        <>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    {error}
                </div>
            )}

            {userBookings.length === 0 ? (
                <div className="text-center text-gray-500 py-5">
                    No reservations in your cart.
                </div>
            ) : (
                userBookings.map((bookItem) => (
                    <div 
                        className="bg-slate-200 rounded px-5 mx-5 py-2 my-3"
                        key={bookItem._id}
                    >
                        <div className="text-xl font-bold underline">{bookItem.hotel}</div>
                        <div className="text-sm">Name of the person booking: {bookItem.nameLastname}</div>
                        <div className="text-sm">Tel: {bookItem.tel}</div>
                        <div className="text-sm">Check-In: {bookItem.checkIn}</div>
                        <div className="text-sm">Check-Out: {bookItem.checkOut}</div>
                        
                        <div className="text-md">Duration: {bookItem.numOfDays} Days</div>
                        
                        <div className="flex space-x-2 mt-2">
                            <button 
                                className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
                                text-white shadow-sm" 
                                onClick={() => handleRemoveReservation(bookItem)}
                            >
                                Remove from Cart
                            </button>
                            <button 
                                className="block rounded-md bg-green-600 hover:bg-green-700 px-3 py-2
                                text-white shadow-sm" 
                                onClick={() => handleEditReservation(bookItem)}
                            >
                                Edit Reservation
                            </button>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}
    






















































































// import getAllBookings from "@/libs/GetAllBooking";
// import { BookingItem } from "../../../../interfaces";
// import { eachItemsBooking } from "../../../../interfaces";
// import ReservationCart from "@/components/ReservationCart";


// export default async function GetBookingPage() {
//     const Booking : BookingItem[] = await getAllBookings();
//     console.log(Booking)
    
//     return(
//         <div>
//             {
//                 Booking.map((eachBooking : BookingItem )=>(
//                     <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-3" key={eachBooking.hotelId}>
//                         <div className="text-xl font-bold underline">{eachBooking.hotel.name}</div>
//                         <div className="text-sm">Name of the person booking: {eachBooking.nameLastname}</div>
//                         <div className="text-sm">Check-In: {eachBooking.checkIn}</div>
//                         <div className="text-sm">Check-Out: {eachBooking.checkOut}</div>                
//                         <div className="text-md">Duration: {eachBooking.numOfDays}</div>
//                         {/* <div>
//                             <button  className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
//                                 text-white shadow-sm" onClick={() => dispatch(removeReservation(eachBooking))}>
//                                 Remove from Booking
//                             </button>
//                             <button  className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
//                                 text-white shadow-sm" onClick={() => dispatch(removeReservation(eachBooking))}>
//                                 Edit from Booking
//                             </button>

//                         </div> */}
//                     </div>
//                 ))
//             }
//         </div>
//     );
    
// }