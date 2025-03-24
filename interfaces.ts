export interface CarItem {
    id:string;
}

export interface RegisterFormProps {
    formData: {
        userName: string;
        userTelephone: string;
        userEmail: string;
        userPassword: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    error: string | null;
    success: boolean;
}
export interface BookingItem {
    _id : string
    nameLastname: string
    tel: string
    hotel : string
    hotelId : string
    checkIn: string
    checkOut: string
    numOfDays: number
    user : string
    bookingId?: string;
}

export interface ReservationItem {
    carId: string
    carModel: string
    numOfDays: number
    pickupDate: string
    pickupLocation: string
    returnDate: string
    returnLocation: string
}