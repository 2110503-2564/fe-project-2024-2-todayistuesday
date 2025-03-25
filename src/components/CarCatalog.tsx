import Link from "next/link";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ProductCard from "./ProductCard";
import { TypeHotel } from "../../interfaces";
import { XXX } from "../../interfaces";

export default async function CarCatalog({carJson} : {carJson:Promise<XXX>}) {
    const session = await getServerSession(authOptions);
    const carJsonReady  = await carJson;

    return (
        
        <>
        Explore {carJsonReady.count} hotel in our catalog
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {
                    carJsonReady.data.map( (carItem:TypeHotel)=>(
                        <div>
                             <Link href={`/hotels/${carItem._id}`} className="w-1/5">
                                <ProductCard carName={carItem.name} imgSrc={carItem.picture}/>
                            </Link>
                        </div>
                    ))
                }
        </div>
        </>
    );
}