import getAllBookings from "@/libs/GetAllBooking";
import { BookingItem } from "../../../../interfaces";
import { eachItemsBooking } from "../../../../interfaces";

export default async function GetBookingPage() {
    const Booking : BookingItem[] = await getAllBookings();
    console.log(Booking)
    return(
        <div>
            {
                Booking.map((eachBooking : BookingItem )=>(
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-3" key={eachBooking.hotelId}>
                        <div className="text-xl font-bold underline">{eachBooking.hotel.name}</div>
                        <div className="text-sm">Name of the person booking: {eachBooking.nameLastname}</div>
                        <div className="text-sm">Check-In: {eachBooking.checkIn}</div>
                        <div className="text-sm">Check-Out: {eachBooking.checkOut}</div>                
                        <div className="text-md">Duration: {eachBooking.numOfDays}</div>
                        {/* <div>
                            <button  className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
                                text-white shadow-sm" onClick={() => dispatch(removeReservation(eachBooking))}>
                                Remove from Booking
                            </button>
                            <button  className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
                                text-white shadow-sm" onClick={() => dispatch(removeReservation(eachBooking))}>
                                Edit from Booking
                            </button>

                        </div> */}
                    </div>
                ))
            }
        </div>
    );
    
}