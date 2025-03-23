import Image from 'next/image';
import getCar from '@/libs/getCar';
import Link from 'next/link';

export default async function CarDetailPage( {params} : {params:{cid:string}} ) {

    const carDetail = await getCar(params.cid);

    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{carDetail.data.model}</h1>
            <div className="flex flex-row my-5">
                <Image src={ carDetail.data.picture } 
                alt='Car Image'
                width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%]" />
                <div className="text-md mx-5 text-left">{ carDetail.data.description }
                <div className="text-md mx-5">Name : { carDetail.data.name }</div>
                <div className="text-md mx-5">Address : { carDetail.data.address }</div>
                <div className="text-md mx-5">District : { carDetail.data.district }</div>
                <div className="text-md mx-5">Province : { carDetail.data.province }</div>
                <div className="text-md mx-5">Postalcode : { carDetail.data.postalcode }</div>
                <div className="text-md mx-5">Tel : { carDetail.data.tel }</div>
                <div className="text-md mx-5">Region: { carDetail.data.region }</div>
                <div className="text-md mx-5">Daily Rental Rate : { carDetail.data.dayRate } (insurance included)</div>

                <Link href={`/reservations?id=${params.cid}&name=${carDetail.data.name}`}>
                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
            text-white shadow-sm">Make Reservation</button>
                </Link>

                </div>
            </div>
        </main>
    );
    
}