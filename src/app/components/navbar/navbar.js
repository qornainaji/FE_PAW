"use client";
import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import styles from '../../globals.css';
import axios from 'axios';

const jwt = require('jsonwebtoken');


export default function Navbar({ isAdmin }) {
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const [name, setName] = useState("");

    useEffect(() => {
        if(localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        console.log(token);
        if(token)
        {
            const decodedToken = jwt.decode(token);
            setId(decodedToken._id);
        } // console.log(decodedToken);
    }
    }, [token])

    useEffect(() => {
        if(id) {
            // fetch user.username
            axios.get(`http://localhost:4000/users/${id}`)
            .then(res => {
                console.log(res.data);
                setName(res.data.user_username);
            })
        }
    }, [id])
      
    return (
        <div className='sticky-navbar w-full'>
            {/* {token} */}
            {/* {id} */}
            <nav className='flex font-sans text-xl text-neutral-500 justify-between items-center px-[120px] py-[24px] bg-orange-100'>
                {/* <h1 className='font-bold text-green-1-900'>ACADEMIA DTETI</h1> */}
                <Image src='/images/AcademiaDTETI.png' alt='Logo' width={195.2} height={32} className=''/>
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
                <div className='flex space-x-[8px]'>
                    <p className='text-[16px] font-semibold text-green-1-900'>Halo, {name}</p>
                    <p className='w-[32px] h-[32px] rounded-full bg-green-600'></p>
                </div>
            </nav>
        </div>
  );

}
