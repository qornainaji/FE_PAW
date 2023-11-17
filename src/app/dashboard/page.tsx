"use client";
import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import React from 'react';
import SeeBookModal from '../components/modal/seebookmodal';
import Link from 'next/link';
import axios from 'axios';
import FadeIn from '../animations/FadeIn';
import Posts from '../components/posts/posts';
import SearchBar from '../components/searchbar/searchbar';

const Dashboard = () => {

    const [documents, setDocuments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [isOpen, setIsOpen] = useState(false);

    const [showModal, setShowModal] = useState(false);

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

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Fragment>
                <div className="flex flex-col h-screen bg-orange-100 text-neutral-1000">
                    <Head>
                        <title>Dashboard</title>
                        <meta name="description" content="Dashboard" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>

                    <Navbar isAdmin={true} />

                    <div className='mt-20'>
                        <h1>Welcome to the Dashboard</h1>
                        <p>This is where you can manage your account settings and view your data.</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => setShowModal(true)}>
                            See Book
                        </button>
                        
                    </div>
                </div>
                <SeeBookModal isVisible={showModal} onCLose={() => setShowModal(false)}/>
            </Fragment>    
        </>
    );
};

export default Dashboard;
