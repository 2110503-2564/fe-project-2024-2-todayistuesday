"use client"
import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeReservation } from "@/redux/features/cartSlice";
import { useSession } from "next-auth/react";

export default function ReservationCart() {
    const { data: session } = useSession();
    const carItems = useAppSelector((state) => state.cartSlice.carItems);
    const dispatch = useDispatch<AppDispatch>();

    // Filter bookings to show only the current user's bookings
    const userBookings = carItems.filter(
        (bookItem) => bookItem.user === session?.user?._id
    );

    return (
        <>
            {userBookings.length === 0 ? (
                <div className="text-center text-gray-500 py-5">
                    No reservations in your cart.
                </div>
            ) : (
                userBookings.map((bookItem) => (
                    <div 
                        className="bg-slate-200 rounded px-5 mx-5 py-2 my-3"
                        key={bookItem.hotel}
                    >
                        <div className="text-xl font-bold underline">{bookItem.hotel}</div>
                        <div className="text-sm">Name of the person booking: {bookItem.nameLastname}</div>
                        <div className="text-sm">Check-In: {bookItem.checkIn}</div>
                        <div className="text-sm">Check-Out: {bookItem.checkOut}</div>
                        
                        <div className="text-md">Duration: {bookItem.numOfDays} Days</div>
                        <button 
                            className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
                            text-white shadow-sm" 
                            onClick={() => dispatch(removeReservation(bookItem))}
                        >
                            Remove from Cart
                        </button>
                    </div>
                ))
            )}
        </>
    );
}
