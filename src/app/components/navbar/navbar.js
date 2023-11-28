"use client";
import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import styles from '../../globals.css';
import axios from 'axios';
import { Router, useRouter } from 'next/navigation';
import cookieCutter from 'cookie-cutter';

const jwt = require('jsonwebtoken');


export default function Navbar({ isAdmin }) {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const [name, setName] = useState("");

    useEffect(() => {
        if(cookieCutter.get('token')) {
            setToken(cookieCutter.get('token'));
        console.log(token);
        if(token)
        {
            const decodedToken = jwt.decode(token);
            setId(decodedToken._id);
            // console.log(decodedToken);
        } 
    }
    }, [token])

    useEffect(() => {
        if(id) {
            // fetch user.username
            axios.get(`http://localhost:4000/users/${id}`)
            .then(res => {
                // console.log(res.data);
                setName(res.data.user_username);
            })
        }
    }, [id])
      
    return (
        <div className='sticky-navbar w-full'>
            {/* {token} */}
            {/* {id} */}
            <nav className='flex font-sans text-xl text-neutral-500 justify-between items-center px-[120px] py-[0px] bg-orange-100'>
                {/* <h1 className='font-bold text-green-1-900'>ACADEMIA DTETI</h1> */}
                <div className='flex items-center'>
                    <Image src='/images/AcademiaDTETI.png' alt='Logo' width={195.2} height={32} className='mb-2 items-center justify-center' />
                    {isAdmin && <p className='ml-2 font-semibold text-green-1-900 items-center justify-center'>Admin</p>}
                </div>
                {isAdmin ? (
                    <ul className='flex font-semibold text-[16px] space-x-[72px]'>
                    <li className='hover:text-green-2-600 transition-colors'>
                        <Link href='/'>Beranda</Link>
                    </li>
                    <li className='hover:text-green-2-600 transition-colors'>
                        <Link href='/dashboard'>Dashboard</Link>
                    </li>
                    <li className='hover:text-green-2-600 transition-colors'>
                        <Link href='/verifikasi'>Verifikasi</Link>
                    </li>
                    </ul>
                ) : null}
                <Link href='/profile' className='h-full py-6 px-6 hover:bg-green-2-200 transition-all'>
                    <div className='flex space-x-[8px]'>
                        <p className='text-[16px] font-semibold text-green-1-900'>Halo, {name}</p>
                        <p className='w-[32px] h-[32px] rounded-full bg-green-600'></p>
                    </div>
                </Link>
            </nav>
        </div>
  );

}
