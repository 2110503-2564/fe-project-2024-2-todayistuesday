import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interfaces";
import { eachBookingItem } from "../../../interfaces";

type CartState = {
    carItems: BookingItem[]
}

const initialState:CartState = { carItems:[] }

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addReservation: (state, action:PayloadAction<BookingItem>)=>{
            state.carItems.push(action.payload)
        },
        removeReservation: (state, action:PayloadAction<BookingItem>)=>{
            const remainItems = state.carItems.filter( obj => {
                return ( (obj.hotel !== action.payload.hotel) 
                || (obj.checkIn !== action.payload.checkIn)
                || (obj.checkOut !== action.payload.checkOut) )
            })
            state.carItems = remainItems
        },
        updateBookingState: (state, action: PayloadAction<eachBookingItem>) => {
            const index = state.carItems.findIndex(b => b._id === action.payload._id );
            if (index !== -1) {
                state.carItems[index].nameLastname = action.payload.nameLastname;
                state.carItems[index].checkIn = action.payload.checkIn;
                state.carItems[index].checkOut = action.payload.checkOut;
                state.carItems[index].numOfDays = action.payload.numOfDays;
                state.carItems[index].tel = action.payload.tel;
            }
        },
    }
})

export const {addReservation, removeReservation ,updateBookingState } = cartSlice.actions
export default cartSlice.reducer