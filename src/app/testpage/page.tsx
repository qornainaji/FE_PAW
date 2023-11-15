"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import React from 'react';
import axios from 'axios';

const Testpage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_API_URL + 'users', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
            .then((response) => {
                setUsers(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    // transform JSON data from API to be used in table

    

    return (
        <>
            <div className="flex flex-col h-full bg-orange-100 text-neutral-1000 font-sans">
                <Head>
                    <title>Test Page</title>
                    <meta name="description" content="test" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Navbar isAdmin={true} />

                <div className='mt-10'>
                    <h1>Testpage</h1>
                    <p>This is where you can manage your account settings and view your data.</p>
                    <div className='mt-10 mb-10'>
                        <h2>Users</h2>
                        {/* Print the usernames in a list */}
                        <ul>
                            {Array.isArray(users) && users.map(user => (
                            <li key={user._id}>
                                <p>User ID: {user._id}</p>
                                <p>Name: {user.user_name}</p>
                                <p>Email: {user.user_email}</p>
                                {/* Additional user details */}
                            </li>
                            ))}
                        </ul>

                        {/* show raw response from API */}
                        {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
                    </div>
                    <p>Test</p>
                    
                </div>
            </div>
        </>
    );
};

export default Testpage;
