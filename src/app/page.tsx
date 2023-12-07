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
import SearchButton from './components/button/button';
import PageNumbers from './components/pageNumbers/pageNumbers';
import LoadingScreen from './components/loadingScreen/loadingScreen';

export default function Home() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  // For pagination
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limitNum, setLimitNum] = useState(20);

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
            let totalDocuments = 0;
            
            // Convert page & limit to number
            const pageNum = parseInt(page) || 1;
            const limitNum = parseInt(limit) || 20;
            axios.get(
                  process.env.NEXT_PUBLIC_API_URL + 
                  'documents' + 
                  `?page=${pageNum}${limit ? `&limit=${limit}` : ''}`, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((response) => {
                    // console.log(JSON.stringify(response.data.results));
                    setPageNum(pageNum);
                    setLimitNum(limitNum);
                    setDocuments(response.data.results);
                    totalDocuments = response.data.results.length;
                    setTotalPages(Math.ceil(totalDocuments / limitNum));
                    // console.log("Total Documents: " + totalDocuments);
                })
                .catch((error) => {
                    console.error('Error fetching documents:', error);
                    // Handle error (e.g., show an error message to the user)
                    alert('Error fetching documents');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }
  }, [refetchTrigger])

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

  // Loading screen when fetching data
  useEffect(() => {
    if (isLoading) {
        
    } else {
        console.log("Done loading!");
    }
  }, [isLoading])

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

  const URLEncodedWhatsAppMessage = "Halo%20Mas%2C%20saya%20ingin%20menambahkan%20entri%20ke%20Academia%20DTETI."
  const WhatsappURL = "https://wa.me/6281227360323?text=" + URLEncodedWhatsAppMessage

  return (
    <FadeIn>
      {/* Loading Screen */}
      <div className={`fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center bg-white ${isLoading ? 'visible' : 'invisible'}`}>
        {/* <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-600"></div> */}
        <LoadingScreen />
      </div>

      <ToastContainer />
      <div className="flex flex-col h-fit pt-20 items-center bg-orange-100 text-neutral-1000 font-sans">
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
        <h2 className='mx-auto text-center font-sans font-bold text-[38px] mb-10'>Cari dokumen kamu di bawah!</h2>
        <div className="w-full flex justify-center h-auto font-sans drop-shadow-[0_12px_20px_rgba(220,155,107,0.24)]">
            <form className="flex w-[90%] max-w-[794px] py-[18px] bg-neutral pl-[20px] rounded-full pr-[8px] relative items-center"
              onSubmit={(e) => {
                e.preventDefault();
                if(searchKeyword == '') {
                  setRefetchTrigger(!refetchTrigger);
                  return;
                }
                const result = documents.filter((document) => {
                    return document.doc_title.toLowerCase().includes(searchKeyword.toLowerCase());
                })
                setDocuments(result)
                if(!result.length) {
                    alert("Dokumen tidak ditemukan");
                    setRefetchTrigger(!refetchTrigger);
                }
              }}>
                <input
                    type="text"
                    className="w-full font-medium  text-[16px] text-neutral-900 placeholder:text-neutral-500 focus:outline-none"
                    placeholder="Cari dokumen kamu disini..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <SearchButton
                    className="absolute right-[8px] hover:bg-green-2-600"
                    type='submit'
                />
            </form>
        </div>

        <div className='flex flex-col justify-center align-middle bg-center w-full'>
          {/* Posts. Show 4 items per row */}
          <Posts posts={documents}/>
          
          {/* Page Numbers using a loop */}
          <PageNumbers currentPage={pageNum} totalPages={totalPages} limit={limitNum}/>
        </div>

        {/* Contact Admin for Upload Requests */}
        <div className='flex flex-col items-center justify-center max-w-fill w-full mb-32 mt-20'>
          <h1 className='font-bold text-[60px] text-center'>
            Contact Admin for Upload Requests
          </h1>
          <div className='flex flex-col items-center space-y-[12px] mt-16'>
            <h1 className='font-bold text-[60px] text-center'>
              {/* Button to Admin Whatsapp */}
              <a href={WhatsappURL} target="_blank">
                <button className='flex bg-green-600 rounded-full text-[24px] space-x-[10px] items-center text-center text-neutral font-bold py-[12px] px-[24px] hover:scale-110 hover:bg-white hover:text-green-2-600 hover:border-green-2-600 hover:border-2 hover:shadow-md hover:shadow-green-2-600 transition-all ease-in-out duration-300'>
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
