"use client";
import React, { useState } from 'react';
import Image from 'next/image'
import Navbar from './components/navbar/navbar'
import { IoArrowDownOutline } from 'react-icons/io5'
import axios from 'axios';
import { Form, Input, Button, Typography } from 'antd';
import CustomAlert from './components/CustomAlert/CustomAlert';
import { useRouter } from 'next/navigation';
import FadeIn from './animations/FadeIn';

export default function Home() {
  const router = useRouter();

  // Sign Out function (delete the token from the cookie)
  const signOut = () => {
    document.cookie="token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/auth/login');
  }

  return (
    <FadeIn>
    <main className="flex flex-col items-center bg-orange-100 text-neutral-1000 font-sans">
      <Navbar isAdmin={true}/>
      <div className="flex flex-col items-center  w-full min-h-[100vh] bg-cover bg-bottom bg-[url('../../public/images/Hero_Banner.png')]">
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

        {/* Profile Page Button */}
        <a
          href="/profile"
          className="mb-10 group rounded-lg border border-transparent px-5 py-4 transition-colors bg-orange-100 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          // target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Profile Page{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            View your profile page (Github only, currently).
          </p>
        </a>
      

        {/* Sign Out Button */}
        <button
          className="mb-10 group rounded-lg border border-transparent px-5 py-4 transition-colors bg-orange-100 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          onClick={signOut}
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Sign Out{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Sign out from your account.
          </p>
        </button>
          
      </div>
    </main>
    </FadeIn>
  )
}
