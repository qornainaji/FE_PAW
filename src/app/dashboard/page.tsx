"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import React from 'react';
import axios from 'axios';
import FadeIn from '../animations/FadeIn';

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
            <div className="flex flex-col h-screen bg-orange-100 text-neutral-1000">
                <Head>
                    <title>Dashboard</title>
                    <meta name="description" content="Dashboard" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Navbar isAdmin={true} />

                <div className='mt-10 mb-10'>
                        <h2>Documents</h2>
                        {/* Print the usernames in a list */}
                        <ul>
                            {Array.isArray(documents) && documents.map(document => (
                            <li key={document._id}>
                                <p>Document ID: {document._id}</p>
                                <p>Matkul: {document.doc_major}</p>
                                <p>Judul: {document.doc_title}</p>
                                {/* Additional user details */}
                            </li>
                            ))}
                        </ul>

                        {/* show raw response from API */}
                        <pre>{JSON.stringify(documents, null, 2)}</pre>
                    
                </div>
            </div>
        </FadeIn>
    );
};

export default Dashboard;
