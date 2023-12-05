"use client";
import { Fragment, use, useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import React from 'react';
// import SeeBookModal from '../components/modal/seebookmodal';
import Modal from '../components/modal/modal';
import Content from '../components/content/content';
import Link from 'next/link';
import axios from 'axios';
import FadeIn from '../animations/FadeIn';
import Posts from '../components/posts/posts';
import SearchBar from '../components/searchbar/searchbar';
import { checkAuthentication } from '../auth/checkAuthentication';
import { useRouter } from 'next/navigation';
import SearchButton from '../components/button/button';
import PageNumbers from '../components/pagenumbers/pagenumbers';

const Dashboard = () => {
    const router = useRouter();

    const [documents, setDocuments] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [refetchTrigger, setRefetchTrigger] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    // const [showModal, setShowModal] = useState(modal);
    // const [showModal, setShowModal] = useAtom(modal);
    // console.log(modal);

    // For pagination
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limitNum, setLimitNum] = useState(20);

    useEffect(() => {
        checkAuthentication( router );
      }, [])

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
                        setLoading(false);
                    });
            }
        }
      }, [refetchTrigger])

    return (
        <>
            <FadeIn>
                <div className="flex flex-col h-fit bg-orange-100 text-neutral-1000 min-h-screen">
                    <Head>
                        <title>Dashboard</title>
                        <meta name="description" content="Dashboard" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>

                    <Navbar isAdmin={true} />

                    <div className='mt-10 mb-10 flex flex-col items-center'>
                        <h2 className='mx-auto text-center font-sans font-bold text-[38px] mb-10'>Cari dokumen kamu di bawah!</h2>
                        <div className="w-full flex justify-center h-auto font-sans drop-shadow-[0_12px_20px_rgba(220,155,107,0.24)]">
                            <form className="flex w-[90%] max-w-[794px] py-[18px] bg-neutral pl-[20px] rounded-full pr-[8px] relative items-center">
                                <input
                                    type="text"
                                    className="w-full font-medium  text-[16px] text-neutral-900 placeholder:text-neutral-500 focus:outline-none"
                                    placeholder="Cari dokumen kamu disini..."
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                />
                                <SearchButton
                                    className="absolute right-[8px] hover:bg-green-2-600"
                                    onClick={(e) => {
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
                                    }}
                                />
                            </form>
                        </div>
                        
                        {/* <h3 className='mx-auto text-center font-sans font-thin text-xl mt-10'><strong>[!TODO: Filter dan kategori di sini]</strong></h3> */}
                        <Content/>
                        <Posts posts={documents} />

                        {/* Clickable Page Number to change pages */}
                        <PageNumbers currentPage={pageNum} totalPages={totalPages} limit={limitNum}/>

                    </div>
                {/* <SeeBookModal isVisible={showModal} onClose={() => setShowModal(false)}/> */}
                {/* {showModal && (
                    <Modal />
                )} */}
                {/* <p>{{showModal}}</p> */}
                </div>
            </FadeIn>    
        </>
    );
};

export default Dashboard;
