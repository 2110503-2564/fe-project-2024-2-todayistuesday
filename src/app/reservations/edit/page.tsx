"use client";
import LocationDateReserve from "@/components/LocationDateReserve";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { updateBooking } from "@/libs/updateBooking";
import { getBooking } from "@/libs/getBooking";
import { BookingItem } from "../../../../interfaces";
import { useDispatch } from "react-redux";
import { updateBookingState } from "@/redux/features/cartSlice";

export default function EditBookingPage() {
    const dispatch = useDispatch() ;
    const router = useRouter();
    const searchParams = useSearchParams();
    const bookingId = searchParams.get('id');
    
    // Use NextAuth session
    const { data: session, status } = useSession();
    const isAuthenticated = status === "authenticated";
    const isLoading = status === "loading";

    // State for booking and form fields
    const [booking, setBooking] = useState<BookingItem | null>(null);
    const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
    const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
    const [nameLastname, setNameLastname] = useState<string>("");
    const [tel, setTel] = useState<string>("");
    const [bookingLoading, setBookingLoading] = useState<boolean>(false);
    const [pageLoading, setPageLoading] = useState<boolean>(true);


    

    // Fetch booking data
    useEffect(() => {
        async function fetchBooking() {
            if (session?.user?.token && bookingId) {
                try {
                    const data = await getBooking(bookingId, session.user.token);
                    
                    setBooking(data.data);
                    
                    setCheckIn(dayjs(data.data.checkIn));
                    setCheckOut(dayjs(data.data.checkOut));
                    setNameLastname(data.data.nameLastname);
                    setTel(data.data.tel);
                } catch (error) {
                    console.error('Error fetching booking:', error);
                    alert("Failed to fetch booking details");
                } finally {
                    setPageLoading(false);
                }
            }
        }

        fetchBooking();
    }, [bookingId, session, status]);

    // Pre-fill name if user is logged in
    useEffect(() => {
        if (session?.user?.name) {
            setNameLastname(session.user.name);
        }
    }, [session]);

    const validateUpdateData = () => {
        // Comprehensive validation
        if (!checkIn || !checkOut || !nameLastname || !tel) {
            alert("Please fill in all required fields.");
            return false;
        }
    
        const numOfDays = dayjs(checkOut).diff(dayjs(checkIn), "day");
    
        if (numOfDays > 3) {
            alert("You cannot update a reservation for more than 3 days.");
            return false;
        }
        
        if (numOfDays <= 0) {
            alert("Check-out date must be after check-in date.");
            return false;
        }
    
        if (!isAuthenticated || !session) {
            alert("You need to log in before updating a reservation.");
            router.push('/api/auth/signin');
            return false;
        }

        return true;
    };

    const handleUpdateBooking = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    
        // Validate update data
        if (!validateUpdateData()) return;
    
        // Prepare updated booking data
        const numOfDays = dayjs(checkOut).diff(dayjs(checkIn), "day");
        setBookingLoading(true);
    
        const updatedBookingData = {
            _id : booking?._id || ""  ,
            nameLastname: nameLastname ,
            tel: tel ,
            checkIn: dayjs(checkIn).format("YYYY-MM-DD"),
            checkOut: dayjs(checkOut).format("YYYY-MM-DD"),
            numOfDays: numOfDays
        };
        
        
        dispatch(updateBookingState(updatedBookingData)) ;
        try {
            // Update booking
            if (bookingId) {
                await updateBooking(
                    bookingId, 
                    session?.user?.token || '', 
                    updatedBookingData
                );
                

                // Show success message and navigate
                alert("Booking updated successfully!");
                router.push('/cart');
            }
        } catch (error) {
            console.error("Booking Update Error:", error);
            alert("Failed to update booking. Please try again.");
        } finally {
            setBookingLoading(false);
        }
    };

    // Loading state
    if (pageLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    // No booking found
    if (!booking) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Booking not found</p>
            </div>
        );
    }

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-3xl font-medium">Update Reservation</div>
            <div className="text-xl font-medium">Hotel: {booking.hotel.name}</div>
            
            {/* Authentication status indicators */}
            {status === "loading" && (
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
                    <p>Checking authentication status...</p>
                </div>
            )}
            
            {status === "unauthenticated" && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                    <p>You need to be logged in to update a reservation.</p>
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
            
            {/* Update Reservation Form */}
            <form className="w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nameLastname">
                        Name-Lastname
                    </label>
                    <input
                        id="nameLastname"
                        type="text"
                        value={nameLastname}
                        onChange={(e) => setNameLastname(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tel">
                        Contact-Number
                    </label>
                    <input
                        id="tel"
                        type="text"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="w-full space-y-2 my-4">
                    <div className="text-md text-left text-gray-600">Check-IN</div>
                    <LocationDateReserve 
                        onDateChange={(value: Dayjs) => setCheckIn(value)}
                        initialDate={checkIn}
                    />
                    <div className="text-md text-left text-gray-600 mt-4">Check-OUT</div>
                    <LocationDateReserve 
                        onDateChange={(value: Dayjs) => setCheckOut(value)}
                        initialDate={checkOut}
                    />
                </div>

                <div className="flex space-x-4">
                    <button
                        type="button"
                        className="w-full mt-6 rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm disabled:bg-gray-400"
                        onClick={(e) => {
                            handleUpdateBooking(e);
                             if (session?.user.role === "admin") {
                               router.push('/AllBookings');
                             } else {
                              router.push('/cart');
                             }
                          }
                    }
                        disabled={bookingLoading || status !== "authenticated"}
                    >
                        {bookingLoading ? "Updating..." : "Update Reservation"}
                    </button>
                    <button
                        type="button"
                        className="w-full mt-6 rounded-md bg-gray-300 hover:bg-gray-400 px-3 py-2 text-gray-700 shadow-sm"
                        onClick={() => {
                             if (session?.user.role === "admin") {
                                 router.push('/AllBookings');
                               } else {
                                 router.push('/cart');
                               }
                        }
                        }>
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    );
}
