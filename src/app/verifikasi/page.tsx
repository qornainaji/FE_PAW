"use client";
import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from '../components/Table/UserTable.js';

const Verifikasi = () => {
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
  

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users');
        console.log('Data from server:', response.data);
  
        const formattedData = response.data.results.map(user => ({
          _id: user.id,
          user_name: user.user_name,
          user_NIM: user.user_NIM,
          user_email: user.user_email,
          user_isAdmin: user.user_isAdmin,
          user_isVerified: user.user_isVerified ? user.user_isVerified : false // Pastikan nilainya adalah boolean
          // properti lain yang diperlukan
        }));
  
        setUsersData(formattedData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };  
  
    const handleCheckboxChange = async (userId, checked) => {
      const updatedUsers = usersData.map(user => {
        if (user.id === userId) {
          return { ...user, allowedLogin: checked };
        }
        return user;
      });
      setUsersData(updatedUsers);
    
      try {
        // Mengirim permintaan PUT untuk memperbarui data di server
        await axios.put(`http://localhost:4000/users/${userId}`, { allowedLogin: checked });
        console.log('Data updated successfully on the server');
      } catch (error) {
        console.error('Error updating user:', error);
        // Handle error jika permintaan ke server gagal
        // Atau lakukan langkah yang sesuai, seperti membalik perubahan pada data lokal
      }
    };
     
    const handleSelectChange = (userId, value) => {
      const updatedUsers = usersData.map(user => {
        if (user.id === userId) {
          return { ...user, accessType: value };
        }
        return user;
      });
      setUsersData(updatedUsers);
    };
  
    const handleEdit = (userId) => {
      console.log(`Editing user with ID: ${userId}`);
    };
  
    const handleDelete = (userId) => {
      const updatedUsers = usersData.filter(user => user.id !== userId);
      setUsersData(updatedUsers);
      console.log(`Deleting user with ID: ${userId}`);
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
  
          <div className='mt-20 text-center text-4xl font-sans'>
            <h1 className="text-3xl font-bold mb-2">Welcome to the Verifikasi, Admin!</h1>
              <p className="text-xl">This is where you can manage the members of our community!</p>
                <div className="px-8 pb-8">
                {/* Menampilkan UserTable dengan properti yang diperlukan */}
                <UserTable
                  users={usersData}
                  handleCheckboxChange={handleCheckboxChange}
                  handleSelectChange={handleSelectChange}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Verifikasi;