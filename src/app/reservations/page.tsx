"use client";
import { TextField } from "@mui/material";
import LocationDateReserve from "@/components/LocationDateReserve";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { BookingItem } from "../../../interfaces";
import { addReservation } from "@/redux/features/cartSlice";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import addBooking from "@/libs/addBooking";

export default function Reservations() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const urlParams = useSearchParams();
    const cid = urlParams.get("id");
    const nameHotel = urlParams.get("name");
    
    // Use NextAuth session
    const { data: session, status } = useSession();
    const isAuthenticated = status === "authenticated";
    const isLoading = status === "loading";

    const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
    const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
    const [nameLastname, setNameLastname] = useState<string>("");
    const [tel, setTel] = useState<string>("");
    const [bookingLoading, setBookingLoading] = useState<boolean>(false);

    // Pre-fill name if user is logged in
    useEffect(() => {
        if (session?.user?.name) {
            setNameLastname(session.user.name);
        }
    }, [session]);

    const validateReservationData = () => {

        if (!cid) {
        alert("Hotel ID is missing");
        return;
    }
        // Comprehensive validation
        if (!checkIn || !checkOut || !nameLastname || !tel || !cid) {
            alert("Please fill in all required fields.");
            return false;
        }
    
        const numOfDays = dayjs(checkOut).diff(dayjs(checkIn), "day");
    
        if (numOfDays > 3) {
            alert("You cannot book a reservation for more than 3 days.");
            return false;
        }
        
        if (numOfDays <= 0) {
            alert("Check-out date must be after check-in date.");
            return false;
        }
    
        if (!isAuthenticated || !session) {
            alert("You need to log in before making a reservation.");
            router.push('/api/auth/signin');
            return false;
        }

        return true;
    };

    const makeReservation = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    
        // Validate reservation data
        if (!validateReservationData()) return;

        if (!cid) {
            alert("Hotel ID is missing");
            return;
        }
    
        // Prepare booking data
        const numOfDays = dayjs(checkOut).diff(dayjs(checkIn), "day");
        setBookingLoading(true);
    
        const bookingData = {
            userId: session?.user?._id,
            nameLastname: nameLastname,
            tel: tel,
            checkIn: dayjs(checkIn).format("YYYY-MM-DD"),
            checkOut: dayjs(checkOut).format("YYYY-MM-DD"),
            numOfDays: numOfDays
        };
    
        try {
            // Add booking and get the response
            const createdBooking = await addBooking(cid, bookingData, session?.user?.token || '');
            console.log('Full Booking Response:', createdBooking); // Log the full response

            // If the ID is nested, try accessing it differently
            const bookingId = createdBooking._id || 
                            createdBooking.id || 
                            createdBooking.booking?._id || 
                            null;   
            
            // Create booking item with returned _id
            const item: BookingItem = {
                _id: createdBooking.data._id, // Use the ID from the API response
                nameLastname: nameLastname,
                tel: tel,
                hotel: nameHotel || '',
                hotelId: cid || '',
                checkIn: dayjs(checkIn).format("YYYY/MM/DD"),
                checkOut: dayjs(checkOut).format("YYYY/MM/DD"),
                numOfDays: numOfDays,
                user: session?.user?._id || ''
            };

            // Dispatch to Redux
            dispatch(addReservation(item));
            console.log(createdBooking.data._id);

            // Show success message and navigate
            alert("Reservation successful!");
            router.push('/cart');
        } catch (error) {
            console.error("Reservation Error:", error);
            alert("Failed to make reservation. Please try again.");
        } finally {
            setBookingLoading(false);
        }
    };

    // Render method remains largely the same
    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-3xl font-medium">New Reservation</div>
            <div className="text-xl font-medium">Hotel : {nameHotel}</div>
            
            {/* Authentication status indicators */}
            {status === "loading" && (
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
                    <p>Checking authentication status...</p>
                </div>
            )}
            
            {status === "unauthenticated" && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                    <p>You need to be logged in to complete a reservation.</p>
                    <button 
                        onClick={() => router.push('/api/auth/signin')}
                        className="mt-2 text-blue-600 underline"
                    >
                        Log in now
                    </button>
                </div>
            )}
            
            {isAuthenticated && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
                    <p>You are logged in as {session?.user?.name || "a user"}.</p>
                </div>
            )}
            
            {/* Reservation Form */}
            <form className="w-full max-w-md">
                <TextField
                    required
                    fullWidth
                    variant="standard"
                    label="Name-Lastname"
                    name="Name-Lastname"
                    margin="normal"
                    className="w-full"
                    value={nameLastname}
                    onChange={(e) => setNameLastname(e.target.value)}
                />
                <TextField
                    required
                    fullWidth
                    variant="standard"
                    label="Contact-Number"
                    name="Contact-Number"
                    margin="normal"
                    className="w-full"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                />
                <div className="w-full space-y-2 my-4">
                    <div className="text-md text-left text-gray-600">Check-IN</div>
                    <LocationDateReserve onDateChange={(value: Dayjs) => setCheckIn(value)} />
                    <div className="text-md text-left text-gray-600 mt-4">Check-OUT</div>
                    <LocationDateReserve onDateChange={(value: Dayjs) => setCheckOut(value)} />
                </div>

                <button
                    type="button"
                    className="w-full mt-6 rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm disabled:bg-gray-400"
                    onClick={makeReservation}
                    disabled={bookingLoading || status !== "authenticated"}
                >
                    {bookingLoading ? "Processing..." : "Reserve this Hotel"}
                </button>
            </form>
        </main>
    );
}
