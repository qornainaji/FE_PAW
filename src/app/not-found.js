"use client";
require('dotenv').config();
import React from 'react';
import Navbar from './components/navbar/navbar';
import Image from 'next/image';
import { IoArrowBack } from 'react-icons/io5';
import FadeIn from './animations/FadeIn';

// pages/404.js

const NotFoundPage = () => {
    const handleBackToHome = () => {
      window.location.href = '/';
    };
    
    return (
        <FadeIn>
          <div className="flex flex-col min-h-screen h-fit bg-orange-100 text-neutral-1000">
            <Navbar />
            <Image />
            <div style={{ marginTop: '80px' }}></div>
            <div className="flex flex-col items-center w-full min-h-[100vh] bg-cover bg-bottom bg-[url('/images/error-back.png')]">
              <div className='flex flex-col items-center space-y-[12px] mt-[70px]'></div>
              <div style={{ marginTop: '160px' }}></div>
              <Image src="/images/404-text.png" width={500} height={300} alt="404 text" />
              <h1 className='font-bold font-sans text-[48px] text-center'>
                Oops... Sorry, page not found
              </h1>
              <div style={{ marginTop: '12px' }}></div>
              <button
                className='flex text-[24px] space-x-[10px] items-center text-center text-green-2-500 font-bold font-sans py-[12px] px-[24px] hover:scale-110 transition ease-in-out delay-150 duration-300'
                onClick={handleBackToHome}
              >
                <IoArrowBack className='text-green-2-500'/>
                <p>Beranda</p>
              </button>
            </div>
          </div>
        </FadeIn>
      );
    };
  
  export default NotFoundPage;
  