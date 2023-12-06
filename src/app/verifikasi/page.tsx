"use client";
require('dotenv').config();
import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from '../components/Table/UserTable.js';
import FadeIn from '../animations/FadeIn';

const Verifikasi = () => {
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
      console.log('Calling fetchData...');
      fetchData();
    }, []);
  

    const fetchData = async () => {
      try {
        console.log('Fetching data from server...');
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'users');
        console.log('Data from server:', response.data);
  
        const formattedData = response.data.results.map(user => ({
          _id: user._id,
          user_name: user.user_name,
          user_NIM: user.user_NIM,
          user_email: user.user_email,
          user_isAdmin: user.user_isAdmin,
          user_isVerified: user.user_isVerified, // Pastikan nilainya adalah boolean
          // user_password: user.user_password
          // properti lain yang diperlukan
        }));
  
        setUsersData(formattedData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };  
  
    // const handleCheckboxChange = async (userId, checked) => {
    //   if (!userId) {
    //     console.error('Invalid user ID');
    //     return;
    //   }
    
    //   const updatedUsers = usersData.map(user => {
    //     if (user._id === userId) {
    //       return { ...user, user_isVerified: checked }; // Memperbarui user_isVerified berdasarkan checkbox
    //     }
    //     return user;
    //   });
    //   setUsersData(updatedUsers);
    
    //   try {
    //     // Mengirim permintaan PATCH untuk memperbarui data di server
    //     await axios.patch(process.env.NEXT_PUBLIC_API_URL + 'users/' + userId, { user_isVerified: checked });
    //     console.log('Data updated successfully on the server');
    //   } catch (error) {
    //     console.error('Error updating user:', error);
    //   }
    // };
    
    const handleCheckboxChange = async (userId, checked) => {
      console.log(userId, checked);
      if (!userId) {
        console.error('Invalid user ID or checked value');
        return;
      }
  
      try {
        await axios.patch(`http://localhost:4000/users/${userId}`, {
          user_isVerified: true,
        });
  
        console.log('Data updated successfully on the server');
  
        // Refresh data setelah perubahan berhasil
        fetchData();
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };
    

      
    // const handleCheckboxChange = async (userId, checked) => {
    //   const updatedUsers = usersData.map(user => {
    //     if (user.id === userId) {
    //       return { ...user, allowedLogin: checked };
    //     }
    //     return user;
    //   });
    //   setUsersData(updatedUsers);
    
    //   try {
    //     // Mengirim permintaan PUT untuk memperbarui data di server
    //     await axios.patch(process.env.NEXT_PUBLIC_API_URL + "users/" + userId , { allowedLogin: checked });
    //     console.log('Data updated successfully on the server');
    //   } catch (error) {
    //     console.error('Error updating user:', error);
    //     // Handle error jika permintaan ke server gagal
    //     // Atau lakukan langkah yang sesuai, seperti membalik perubahan pada data lokal
    //   }
    // };
     
    const handleSelectChange = async (userId, value) => {
      console.log(userId, value);
      if (!userId) {
        console.error('Invalid user ID');
        return;
      }
      const isAdmin = value === 'Admin'; // Mengubah string menjadi boolean
    
      try {
        await axios.patch(`http://localhost:4000/users/${userId}`, {
          user_isAdmin: isAdmin,
        });
        console.log('Data updated successfully on the server');
        // Refresh data setelah perubahan berhasil
        fetchData();
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };
  
    const handleEdit = async (userId, updatedData) => {
      console.log(`Editing user with ID: ${userId}`);
  
      try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}users/${userId}`, updatedData);
        console.log('Data updated successfully on the server:', response.data);
  
        // Refresh data setelah perubahan berhasil
        fetchData(); // Memuat ulang data terbaru dari server
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };
  
    const handleDelete = (userId) => {
      // delete user with userId
      const deleteURL = process.env.NEXT_PUBLIC_API_URL + "users/" + userId;
      console.log(deleteURL);

      // Mengirim permintaan DELETE untuk menghapus data di server
      axios.delete(deleteURL)
      .then((response) => {
        console.log(response);
        console.log('Data deleted successfully on the server');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        // Handle error jika permintaan ke server gagal
      })
      .finally(() => {
        // Menghapus data dari state setelah permintaan ke server berhasil
        const updatedUsers = usersData.filter(user => user._id !== userId);
        setUsersData(updatedUsers);
      });
    };
  
    return (
      <FadeIn>
        <div className="flex flex-col min-h-screen h-fit bg-orange-100 text-neutral-1000">
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
                  checkboxChange={handleCheckboxChange}
                  selectChange={handleSelectChange}
                  edit={handleEdit}
                  onDelete={handleDelete}
                  fetchData={fetchData}
                  setUsersData={setUsersData}
                />
            </div>
          </div>
        </div>
      </FadeIn>
    );
  };
  
  export default Verifikasi;