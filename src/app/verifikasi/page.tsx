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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Ubah jumlah item per halaman sesuai kebutuhan

  useEffect(() => {
    console.log('Calling fetchData...');
    fetchData();
  }, [currentPage]); // Panggil fetchData saat currentPage berubah

    const fetchData = async () => {
      try {
        console.log('Fetching data from server...');
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'users');
        console.log('Data from server:', response.data);
  
        const formattedData = response.data.results.map(user => ({
          _id: user._id,
          user_username: user.user_username,
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

    const generatePageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      const ellipsis = '...';
    
      // Jika total halaman kurang dari sama dengan 5
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        const leftSide = Math.floor(maxVisiblePages / 2);
        const rightSide = totalPages - leftSide;
    
        if (currentPage > rightSide) {
          for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
            pages.push(i);
          }
        } else if (currentPage < leftSide) {
          for (let i = 1; i <= maxVisiblePages; i++) {
            pages.push(i);
          }
        } else {
          for (let i = currentPage - Math.floor(maxVisiblePages / 2); i <= currentPage + Math.floor(maxVisiblePages / 2); i++) {
            pages.push(i);
          }
        }
    
        if (pages[0] !== 1) {
          pages.unshift(ellipsis);
        }
        if (pages[pages.length - 1] !== totalPages) {
          pages.push(ellipsis);
        }
      }
    
      return pages;
    };

    const goToPage = (pageNumber) => {
      setCurrentPage(pageNumber);
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
          user_isVerified: checked,
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
     
    const handleSelectChange = async (userId, status) => {
      console.log(userId, status);
      if (!userId) {
        console.error('Invalid user ID');
        return;
      }
    
      try {
        await axios.patch(`http://localhost:4000/users/${userId}`, {
          user_isAdmin: status,
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

// Fungsi untuk mengatur data per halaman
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = usersData.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk menghitung total halaman
  const totalPages = Math.ceil(usersData.length / itemsPerPage);

  // Fungsi untuk pindah ke halaman selanjutnya
  const nextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  // Fungsi untuk pindah ke halaman sebelumnya
  const prevPage = () => {
    setCurrentPage(prev => prev - 1);
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
          <div style={{ marginTop: '40px' }}></div>
          <div className='mt-20 text-center text-4xl font-sans'>
            <h1 className="text-3xl font-bold mb-2">Welcome to the Verifikasi, Admin!</h1>
              <p className="text-xl">This is where you can manage the members of our community!</p>
                <div className="px-8 pb-8">
                {/* Menampilkan UserTable dengan properti yang diperlukan */}
                <div style={{ marginTop: '32px' }}></div>
                <UserTable
                  users={currentItems}
                  checkboxChange={handleCheckboxChange}
                  selectChange={handleSelectChange}
                  edit={handleEdit}
                  onDelete={handleDelete}
                  fetchData={fetchData}
                  // setUsersData={setUsersData}
                />
            </div>

                  {/* Pagination */}
                  <div className="mt-1 flex text-base font-sans items-center justify-center space-x-4">
            {generatePageNumbers().map((page, index) => (
              <div
                key={index}
                onClick={() => goToPage(page)}
                className={`flex items-center text-base font-sans justify-center rounded-full text-neutral-500 border border-neutral-500 h-10 w-10 cursor-pointer ${
                  currentPage === page ? 'bg-green-2-500 text-white text-base font-sans' : ''
                }`}
              >
                {page === '...' ? <div>{page}</div> : <div>{page}</div>}
              </div>
            ))}
          </div>
          <div style={{ marginBottom: '60px' }}></div>
        </div>
      </div>
    </FadeIn>
  );
};
  
  export default Verifikasi;