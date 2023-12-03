"use client";
import React, { use, useEffect, useState } from 'react';
import Image from 'next/image'
import Navbar from './components/navbar/navbar'
import { IoArrowDownOutline } from 'react-icons/io5'
import axios from 'axios';
import { Form, Input, Button, Typography } from 'antd';
import CustomAlert from './components/CustomAlert/CustomAlert';
import { useRouter } from 'next/navigation';
import FadeIn from './animations/FadeIn';
import cookieCutter from 'cookie-cutter';
import jwt from 'jsonwebtoken';
import { checkAuthentication } from './auth/checkAuthentication';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // check if there is a token in the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    // If token is defined, store it in a cookie
    if (token) {
        // Store the token in a cookie
        cookieCutter.set('token', token);
        // Redirect to the home page
        router.push('/');
    }

    checkAuthentication( router );
  }, [])

  useEffect(() => {
    // decode the token
    const token = cookieCutter.get('token');
    if (token) {
        const decodedToken = jwt.decode(token);
        // console.log(decodedToken);
        // console.log(decodedToken.user_isAdmin);
        // set the isAdmin state variable to true if the user is an admin
        if(decodedToken.user_isAdmin) {
            setIsAdmin(true);
        }
    }
  }, [])

  return (
    <FadeIn>
    <ToastContainer />
    <main className="flex flex-col items-center bg-orange-100 text-neutral-1000 font-sans">
      <Navbar isAdmin={isAdmin}/>
      <div className="flex flex-col items-center  w-full min-h-[100vh] bg-cover bg-bottom bg-[url('/images/Hero_Banner.png')]">
        <div className='flex flex-col items-center space-y-[12px] mt-[70px]'>
          <h1 className='font-bold text-[60px] text-center'>
            Welcome to ACADEMIA DTETI <br/> Your All-in-One LIBRARY
          </h1>
          <button className='flex text-[24px] space-x-[10px] items-center text-center text-neutral font-bold py-[12px] px-[24px] hover:scale-110 transition ease-in-out delay-150 duration-300'>
            <p>Lihat Sekarang</p>
            <IoArrowDownOutline className='text-neutral'/>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center max-w-2xl w-full">

        {/* Logo */}
        <Image
          src="/images/AcademiaDTETI.png"
          alt="Logo"
          width={500}
          height={80}
          className="mt-10 mb-8"
        />

        {/* Title */}
        <h1 className="mt-10 text-4xl font-bold mb-20 text-center">
          COMING SOON
        </h1>
          
      </div>
    </main>
    </FadeIn>
  )
}
