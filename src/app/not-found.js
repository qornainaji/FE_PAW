"use client";
require('dotenv').config();
// import Head from 'next/head';
import Navbar from './components/navbar/navbar';
import Image from 'next/image';
import { IoArrowBack } from 'react-icons/io5'
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import UserTable from '../components/Table/UserTable.js';
import FadeIn from './animations/FadeIn';
import { useRouter } from 'next/router';

// pages/404.js

const NotFoundPage = () => {
    // const router = useRouter();

    // const handleBackToHome = () => {
    //   router.push('/beranda');
    // };

    const handleButtonClick = () => {
        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      }
    
    return (
        <FadeIn>
        <div className="flex flex-col min-h-screen h-fit bg-orange-100 text-neutral-1000">
        <Navbar/>
        <Image/>
        <div style={{ marginTop: '80px' }}></div>
        <div className="flex flex-col items-center  w-full min-h-[100vh] bg-cover bg-bottom bg-[url('/images/error-back.png')]">
        <div className='flex flex-col items-center space-y-[12px] mt-[70px]'></div>
        {/* <Image src={}/> */}
        <div style={{ marginTop: '160px' }}></div>
        <Image src="/images/404-text.png" width={500} height={300} alt="404 text" />
        <h1 className='font-bold font-sans text-[48px] text-center'>
        Ooops..... Sorry page not found
          </h1>
          <div style={{ marginTop: '12px' }}></div>
          <button className='flex text-[24px] space-x-[10px] items-center text-center text-green-2-500 font-bold font-sans py-[12px] px-[24px] hover:scale-110 transition ease-in-out delay-150 duration-300'
              onClick={handleButtonClick}>
              <IoArrowBack className='text-green-2-500'/>
              <p>Beranda</p>
             </button>
        </div>
       </div>
      </FadeIn>
    );
  };
  
  export default NotFoundPage;
  