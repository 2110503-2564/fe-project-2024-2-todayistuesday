import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Link } from 'react-router-dom';

export default async function ProductCard( { carName, imgSrc, onCompare} : {carName:string, imgSrc:string , onCompare?:Function} ) {
    return (
        <InteractiveCard contentName={carName}>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                alt='Product Picture'
                fill={true}
                className='object-cover rounded-t-lg'/>
            </div>
            <div className='w-full h-[15%] p-[10px]'>
                {carName}
            </div>
        </InteractiveCard>
    )
}






