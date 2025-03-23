"use client"
import { useAppSelector,AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeReservation } from "@/redux/features/cartSlice";

export default function ReservationCart() {

    const carItems = useAppSelector( (state)=> state.cartSlice.carItems )
    const dispatch = useDispatch<AppDispatch>()

    return(
        <>
        {
            carItems.map((bookItem)=>(
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-3"
                    key={bookItem.hotel}>
                        <div className="text-xl font-bold underline">{bookItem.hotel}</div>
                        <div className="text-sm">Name of the person booking: {bookItem.nameLastname}</div>
                        <div className="text-sm">Check-In: {bookItem.checkIn}</div>
                        <div className="text-sm">Check-Out: {bookItem.checkOut}</div>
                        
                        <div className="text-md">Duration: {bookItem.numOfDays} Days</div>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
                        text-white shadow-sm" onClick={()=> dispatch(removeReservation(bookItem))}>
                            Remove from Cart
                        </button>
                </div>
            ))
        }
        </>
    );
}