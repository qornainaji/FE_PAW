"use client";
import { Fragment, use, useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import React from 'react';
import SeeBookModal from '../components/modal/seebookmodal';
import Content from '../components/content/content';
import Link from 'next/link';
import axios from 'axios';
import FadeIn from '../animations/FadeIn';
import Posts from '../components/posts/posts';
import SearchBar from '../components/searchbar/searchbar';
import { checkAuthentication } from '../auth/checkAuthentication';
import { useRouter } from 'next/navigation';
import SearchButton from '../components/button/button';
const Dashboard = () => {
    const router = useRouter();

    const [documents, setDocuments] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [refetchTrigger, setRefetchTrigger] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const [showModal, setShowModal] = useState(false);

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
                        console.log("Documents:" + documents.length);
                        console.log("Limit:" + limitNum);
                        const totalPages = Math.ceil(documents.length / limitNum);
                        console.log("Pages:" + totalPages);
                    });
            }
        }
    }, [refetchTrigger]);

    return (
        <>
            <FadeIn>
                <div className="flex flex-col h-fit bg-orange-100 text-neutral-1000">
                    <Head>
                        <title>Dashboard</title>
                        <meta name="description" content="Dashboard" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>

                    <Navbar isAdmin={true} />

                    <div className='mt-10 mb-10 flex flex-col items-center'>1
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
                        <div className="flex justify-center items-center mt-10">
                            <a href="/dashboard?page=1">
                                <div className="flex items-center justify-center h-10 w-10 mr-1 rounded-full bg-green-2-500 text-white font-sans cursor-pointer">
                                    1
                                </div>
                            </a>
                            <a href="/dashboard?page=2">
                                <div className="flex items-center justify-center h-10 w-10 mr-1 rounded-full bg-green-2-500 text-white font-sans cursor-pointer">
                                    2
                                </div>
                            </a>
                        </div>

                        {/* show raw response from API */}
                        {/* <pre>{JSON.stringify(documents, null, 2)}</pre> */}

                    </div>
                <SeeBookModal isVisible={showModal} onClose={() => setShowModal(false)}/>
                </div>
            </FadeIn>    
        </>
    );
};

export default Dashboard;
