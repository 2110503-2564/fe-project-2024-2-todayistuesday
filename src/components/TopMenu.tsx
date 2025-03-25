import styles from './topmenu.module.css';
import Image from 'next/image';
import Link from 'next/link';  // Import Link from next/link
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Link as MUILink } from '@mui/material';  // Rename MUI Link to avoid conflict

export default async function TopMenu() {
    const session = await getServerSession(authOptions);
    
    return (
        <div className={styles.menucontainer}>
            <Link href="/">
                <Image src="/img/Hotelcard.png" 
                    className={styles.logoimg} 
                    alt='logo'
                    width={0} 
                    height={0} 
                    sizes='100vh'
                />
            </Link>
            {
                session?.user.role==="admin"?
                (<TopMenuItem title='Check Bookings' pageRef='/AllBookings' />) :
                (<TopMenuItem title='Select Hotels' pageRef='/hotels' />)
            }
            <div className='flex flex-row absolute right-0 h-full'>

                {
                    session?.user.role==="admin"?
                    ("") :
                    (<TopMenuItem title='cart' pageRef='/cart' />)

                }

                {
                    session? '': <MUILink href="/api/auth/register">
                        <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>Register</div>
                    </MUILink>
                }
                {
                    session? <MUILink href="/api/auth/signout">
                        <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>Sign-Out</div></MUILink>
                    : <MUILink href="/api/auth/signin">
                        <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>Sign-In</div>
                    </MUILink>
                }
            </div>
        </div>
    );
}
