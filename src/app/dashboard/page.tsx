"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import React from 'react';
import axios from 'axios';
import FadeIn from '../animations/FadeIn';
import Posts from '../components/posts/posts';

const Dashboard = () => {

    const [documents, setDocuments] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if 'document' is defined to avoid issues during server-side rendering
        if (typeof document !== 'undefined') {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('token='))
                ?.split('=')[1];

            // Ensure token is defined before making the API request
            if (token) {
                axios.get(process.env.NEXT_PUBLIC_API_URL + 'documents', { headers: { 'Authorization': `Bearer ${token}` } })
                    .then((response) => {
                        console.log(JSON.stringify(response.data.results));
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
    }, []);


    return (
        <FadeIn>
            <div className="flex flex-col h-min-content bg-orange-100 text-neutral-1000">
                <Head>
                    <title>Dashboard</title>
                    <meta name="description" content="Dashboard" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Navbar isAdmin={true} />

                <div className='mt-10 mb-10'>
                        <h2 className='mx-auto text-center font-sans font-bold text-5xl'>Cari dokumen kamu di bawah!</h2>
                        <Posts posts={documents} />

                        {/* show raw response from API */}
                        {/* <pre>{JSON.stringify(documents, null, 2)}</pre> */}
                    
                </div>
            </div>
        </FadeIn>
    );
};

export default Dashboard;
