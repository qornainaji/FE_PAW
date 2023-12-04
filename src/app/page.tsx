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
import Posts from './components/posts/posts';
import SearchBar from './components/searchbar/searchbar';
import { Footer } from 'antd/es/layout/layout';

export default function Home() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  useEffect(() => {
    // Check if 'document' is defined to avoid issues during server-side rendering
    if (typeof document !== 'undefined') {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];

        // Ensure token is defined before making the API request
        if (token) {
            // Get parameter from URL
            const urlParams = new URLSearchParams(window.location.search);
            let page = urlParams.get('page');
            let limit = urlParams.get('limit');
            
            // Convert page & limit to number
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            axios.get(process.env.NEXT_PUBLIC_API_URL + 'documents' + '?page=' + String(pageNum) + '&limit=' + String(limitNum), { headers: { 'Authorization': `Bearer ${token}` } })
                .then((response) => {
                    // console.log(JSON.stringify(response.data.results));
                    setDocuments(response.data.results);
                })
                .catch((error) => {
                    console.error('Error fetching documents:', error);
                    // Handle error (e.g., show an error message to the user)
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }
  }, [])

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
  
  const handleButtonClick = () => {
    window.scrollTo({
      top: document.getElementById('academiaDTETI').offsetTop,
      behavior: 'smooth'
    });
  }

  return (
    <FadeIn>
    <ToastContainer />
    <div className="flex flex-col h-fit items-center bg-orange-100 text-neutral-1000 font-sans">
      <Navbar isAdmin={isAdmin}/>
      <div className="flex flex-col items-center  w-full min-h-[100vh] bg-cover bg-bottom bg-[url('/images/Hero_Banner.png')]">
        <div className='flex flex-col items-center space-y-[12px] mt-[70px]'>
          <h1 className='font-bold text-[60px] text-center'>
            Welcome to ACADEMIA DTETI <br/> Your All-in-One LIBRARY
          </h1>
          <button className='flex text-[24px] space-x-[10px] items-center text-center text-neutral font-bold py-[12px] px-[24px] hover:scale-110 transition ease-in-out delay-150 duration-300'
            onClick={handleButtonClick}>
            <p>Lihat Sekarang</p>
            <IoArrowDownOutline className='text-neutral'/>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center max-w-2xl w-full">

        {/* Logo */}
        <Image
          id="academiaDTETI"
          src="/images/AcademiaDTETI.png"
          alt="Logo"
          width={500}
          height={80}
          className="mt-10 mb-8"
        />
          
      </div>

      {/* Search Bar */}
      <SearchBar/>
      <div className='flex flex-col justify-center align-middle bg-center w-full'>
        {/* Posts. Show 4 items per row */}
        <Posts posts={documents}/>
      </div>

      {/* Contact Admin for Upload Requests */}
      <div className='flex flex-col items-center justify-center max-w-fill w-full'>
        <h1 className='font-bold text-[60px] text-center'>
          Contact Admin for Upload Requests
        </h1>
        <div className='flex flex-col items-center space-y-[12px] mt-[70px]'>
          <h1 className='font-bold text-[60px] text-center'>
            {/* Button to Admin Whatsapp */}
            <a href="https://wa.me/6281212121212" target="_blank">
              <button className='flex bg-green-600 rounded-full mb-32 text-[24px] space-x-[10px] items-center text-center text-neutral font-bold py-[12px] px-[24px] hover:scale-110 transition ease-in-out delay-150 duration-300'>
                <p>Hubungi Admin</p>
              </button>
            </a>
          </h1>
        </div>
      </div>

      <Footer className='font-sans text-neutral-1000 text-center py-10 w-full bg-white'>
        Academia DTETI ©{new Date().getFullYear()} Created by <strong>PAW Team 9</strong>
      </Footer>
    </div>
    </FadeIn>
  )
}
