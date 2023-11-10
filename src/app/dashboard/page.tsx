"use client";
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import React from 'react';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
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
                </div>
            </div>
        </>
    );
};

export default Dashboard;
