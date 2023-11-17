"use client";
import { Fragment, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import React from 'react';
import SeeBookModal from '../components/modal/seebookmodal';
import Link from 'next/link';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const [showModal, setShowModal] = useState(false);

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
