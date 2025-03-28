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
    hotel : Hotel
    checkIn: string
    checkOut: string
    numOfDays: number
    user : string
}

export interface eachBookingItem {
        _id : string
        nameLastname: string,
        tel: string,
        checkIn: string,
        checkOut: string,
        numOfDays: number
}





export interface eachItemsBooking{
    success : boolean
    count :   number
    data : BookingItem[]
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

export interface User {
    _id : string
    name : string
    email : string
    role : string
    password:string
    tel : string
    createdAt : string
}

export interface Hotel {
    _id : string
    name : string
    province : string
    tel : string
}

export interface TypeHotel {
    _id : string
    name : string
    address : string
    district : string
    province : string
    postalcode : string
    tel : string
    region : string
    picture : string
}

export interface XXX {
    success : boolean
    count : number
    data : TypeHotel[]
}

