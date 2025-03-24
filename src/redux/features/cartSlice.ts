import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interfaces";

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
    }
})

export const {addReservation, removeReservation } = cartSlice.actions
export default cartSlice.reducer