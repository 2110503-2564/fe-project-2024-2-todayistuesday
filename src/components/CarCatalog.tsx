import Link from "next/link";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ProductCard from "./ProductCard";

export default async function CarCatalog({carJson} : {carJson:Object}) {
    const session = await getServerSession(authOptions);
    const carJsonReady = await carJson;

    return (
        <>
        Explore {carJsonReady.count} models in our catalog
        <div style={{margin:"20px" , display:"flex", 
            flexDirection:"row", flexWrap : "wrap" ,
            justifyContent:"space-around", alignContent:"space-around",padding:"10px"}}>
                {
                    carJsonReady.data.map( (carItem:Object)=>(
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