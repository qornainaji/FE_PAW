import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

export default async function ServerPage() {
    const session = await getServerSession(options);

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=http://localhost:3000/profile')
        return null;
    }

    return (
        <section className='flex flex-col items-center justify-center w-screen h-screen'>
            <h1 className='text-4xl font-bold'>Profile Page</h1>
            <p className='mt-5'>Welcome {session.user?.name}</p>
            <p className='mt-5'>Email: {session.user?.email}</p>
            <p className='mt-5'>Image: {session.user?.image}</p>
            
            <Link legacyBehavior href='/api/auth/signout'>
                <a className='mt-5 text-blue-500'>Sign Out</a>
            </Link>
            
        </section>
    )
}