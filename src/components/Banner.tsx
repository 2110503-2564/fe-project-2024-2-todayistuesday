'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Banner() {
    const covers = ['/img/cover1.jpg', '/img/cover2.jpg', '/img/cover3.jpg'];
    const [index, setIndex] = useState(0);
    const router = useRouter();

    const { data: session } = useSession();
    console.log(session?.user.token);

    return (
        <div 
            className="relative w-screen h-[80vh] overflow-hidden cursor-pointer" 
            onClick={() => setIndex(index + 1)}
        >
            <Image 
                src={covers[index % 3]}  
                alt="cover" 
                fill={true}
                priority
                className="object-cover"
            />
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20">
                <h1 className="text-5xl font-medium text-white drop-shadow-lg">
                    HotelHub
                </h1>
                <h3 className="text-2xl font-serif text-white mt-4 drop-shadow-md">
                Luxury, comfort, and unforgettable moments—only one booking away
                </h3>
            </div>
            {session && (
                <div className="absolute top-5 right-10 font-semibold text-white text-xl z-30 ">
                    Hello {session.user?.name}
                </div>
            )}
        </div>
    );
}
    