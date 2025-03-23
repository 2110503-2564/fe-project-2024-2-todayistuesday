"use client";
import { TextField } from "@mui/material";
import LocationDateReserve from "@/components/LocationDateReserve";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { BookingItem } from "../../../interfaces";
import { addReservaition } from "@/redux/features/cartSlice";

export default function Reservations() {
    const dispatch = useDispatch<AppDispatch>();
    const urlParams = useSearchParams();
    const cid = urlParams.get("id");
    const nameHotel = urlParams.get("name");

    const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
    const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
    const [nameLastname, setNameLastname] = useState<string>("");
    const [tel, setTel] = useState<string>("");
    const [Location, setLocation] = useState<string>("Mountain Retreat Lodge");

    const makeReservation = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const numOfDays = dayjs(checkOut).diff(dayjs(checkIn), "day");

        // Check if numOfDays is greater than 3
        if (numOfDays > 3) {
            alert("You cannot book a reservation for more than 3 days.");
            return; // Stop further execution
        }

        if (nameHotel && cid && nameLastname && checkIn && checkOut) {
            const item: BookingItem = {
                nameLastname: nameLastname,
                tel: tel,
                hotel: nameHotel,
                hotelId: cid,
                checkIn: dayjs(checkIn).format("YYYY/MM/DD"),
                checkOut: dayjs(checkOut).format("YYYY/MM/DD"),
                numOfDays: numOfDays,
            };

            dispatch(addReservaition(item));
            alert("Reservation successful!");
        } else {
            alert("Please fill in all required fields.");
        }
    };

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-3xl font-medium">New Reservation</div>
            <div className="text-xl font-medium">Hotel : {nameHotel}</div>
            <form>
                <TextField
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
                    fullWidth
                    variant="standard"
                    label="Contact-Number"
                    name="Contact-Number"
                    margin="normal"
                    className="w-full"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                />
                <div className="w-fit space-y-2">
                    <div className="text-md text-left text-gray-600">Check-IN</div>
                    <LocationDateReserve onDateChange={(value: Dayjs) => setCheckIn(value)} />
                    <div className="text-md text-left text-gray-600">Check-OUT</div>
                    <LocationDateReserve onDateChange={(value: Dayjs) => setCheckOut(value)} />
                </div>

                <button
                    type="button" // Prevent default form submission
                    className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                    onClick={makeReservation}
                >
                    Reserve this Car
                </button>
            </form>
        </main>
    );
}
