import { useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar/navbar';

export default async function ServerPage() {
    // Get session from the "token" cookie
    // const session = await getSession();
    
    const router = useRouter();

    // if (!session) {
    //     router.push('/auth/login?callbackUrl=/profile')
    //     return null;
    // }
    

    return (
        <section className='flex flex-col items-center justify-center w-screen h-screen bg-orange-100 text-neutral-1000 font-sans'>
            <Navbar isAdmin={true}/>
            <h1 className='text-4xl font-bold'>Profile Page</h1>
            {/* <p className='mt-5'>Welcome {session.user?.name}</p>
            <p className='mt-5'>Email: {session.user?.email}</p>
            <p className='mt-5'>Image: {session.user?.image}</p> */}
            {/* <svg className='mt-5' viewBox='0 0 100 100'>
                <image xlinkHref={session.user?.image} type="image/png" width="20" height="20" />
            </svg> */}
            <Link legacyBehavior href='/api/auth/signout'>
                <a className='mt-5 text-blue-500'>Sign Out</a>
            </Link>
        </section>
    )
}