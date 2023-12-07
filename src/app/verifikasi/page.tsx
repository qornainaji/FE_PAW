"use client";
require('dotenv').config();
import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from '../components/Table/UserTable.js';
import FadeIn from '../animations/FadeIn';
import { message, Modal } from 'antd';


const Verifikasi = () => {

  const [deleteUserId, setDeleteUserId] = useState(null); // State untuk menyimpan ID user yang akan dihapus
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // State untuk mengontrol visibilitas modal
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Ubah jumlah item per halaman sesuai kebutuhan

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
    
    const handleCheckboxChange = async (userId, checked) => {
      console.log(userId, checked);
      if (!userId) {
        console.error('Invalid user ID');
        return;
      }
    
      try {
        if (checked) {
          message.loading('Account is being verified');
        } else {
          message.loading('Account is being unverified');
        }
    
        const response = await axios.patch(`http://localhost:4000/users/${userId}`, {
          user_isVerified: checked,
        });
    
        console.log('Data updated successfully on the server');
        message.destroy();
    
        if (response.status === 200) {
          if (checked) {
            message.success('Account verified successfully.');
          } else {
            message.success('Account change to not verified.');
          }
          // Handle success response if needed
        } else {
          message.error('Failed to verify Account.');
          // Handle error scenarios
        }
    
        // Refresh data setelah perubahan berhasil
        fetchData();
      } catch (error) {
        message.error('Error occurred while verifying account. Please try again later.');
        console.error('Error updating user:', error);
      }
    };
     
    const handleSelectChange = async (userId, accessType) => {
      console.log(userId, accessType);
      if (!userId) {
        console.error('Invalid user ID');
        return;
      }
    
      try {
        let messageText = '';
        if (accessType == 'true') {
          messageText = 'Changing user status to Admin';
        } else {
          messageText = 'Changing user status to Non-Admin';
        }
    
        message.loading(messageText);
    
        const response = await axios.patch(`http://localhost:4000/users/${userId}`, {
          user_isAdmin: accessType,
        });
    
        console.log('Data updated successfully on the server');
        message.destroy();
    
        if (response.status === 200) {
          if (accessType == 'true') {
            message.success('User status changed to Admin.');
          } else {
            message.success('User status changed to Non-Admin.');
          }
          // Handle success response if needed
        } else {
          message.error('Failed to change user status.');
          // Handle error scenarios
        }
        
        // Refresh data setelah perubahan berhasil
        fetchData();
      } catch (error) {
        message.error('Error occurred while updating user status. Please try again later.');
        console.error('Error updating user:', error);
      }
    };
    
    
  
    const handleEdit = async (userId, updatedData) => {
      console.log(`Editing user with ID: ${userId}`);
      try {
        message.loading('Saving changes...'); // Menampilkan pesan loading saat proses edit dimulai
    
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}users/${userId}`, updatedData);
        console.log('Data updated successfully on the server:', response.data);
        message.destroy();
    
        if (response.status === 200) {
          message.success('Changes saved successfully.'); // Menampilkan pesan sukses jika edit berhasil
        } else {
          message.error('Failed to save changes.'); // Menampilkan pesan error jika edit gagal
        }
    
        // Refresh data setelah perubahan berhasil
        fetchData(); // Memuat ulang data terbaru dari server
      } catch (error) {
        message.error('Error occurred while saving changes. Please try again later.');
        console.error('Error updating user:', error);
      }
    };

      // Fungsi untuk menampilkan modal konfirmasi delete
  const showDeleteModal = (userId) => {
    setDeleteUserId(userId); // Simpan ID user yang akan dihapus
    setDeleteModalVisible(true); // Tampilkan modal
  };

  // Fungsi untuk menutup modal konfirmasi delete
  const handleCancelDelete = () => {
    setDeleteUserId(null); // Reset ID user yang akan dihapus
    setDeleteModalVisible(false); // Sembunyikan modal
  };
  
  const handleDelete = (userId) => {
    if (deleteUserId) {
      const deleteURL = process.env.NEXT_PUBLIC_API_URL + "users/" + userId;
      axios.delete(deleteURL)
        .then(() => {
          const updatedUsers = usersData.filter(user => user._id !== userId);
          setUsersData(updatedUsers);
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        })
        .finally(() => {
          setDeleteUserId(null);
          setDeleteModalVisible(false);
          fetchData();
        });
    }
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
                  <Modal
                    title="Confirmation"
                    visible={deleteModalVisible}
                    onCancel={handleCancelDelete}
                    onOk={() => handleDelete(deleteUserId)}
                    okText="Delete" // Teks pada tombol OK
                    cancelText="Cancel" // Teks pada tombol Cancel
                    okButtonProps={{ style: { backgroundColor: '#E73032', color: 'white', borderColor: '#E73032' } }}
                    cancelButtonProps={{ style: { backgroundColor: '#BAB9BA', color: 'white', borderColor: '#BAB9BA' } }}
                    bodyStyle={{ fontSize: '16px', fontFamily: 'Quicksand, sans-serif' }} // Pengaturan font
                  >
                    <p>Are you sure you want to delete this user?</p>
                </Modal>
                {/* Menampilkan UserTable dengan properti yang diperlukan */}
                <div style={{ marginTop: '32px' }}></div>
                <UserTable
                  users={currentItems}
                  onDelete={(userId) => showDeleteModal(userId)}
                  checkboxChange={handleCheckboxChange}
                  selectChange={handleSelectChange}
                  edit={handleEdit}
                  fetchData={fetchData}
                  // setUsersData={setUsersData}
                />
            </div>

                  {/* Pagination */}
                  <div className="mt-1 flex text-lg font-medium font-sans items-center justify-center space-x-4">
            {generatePageNumbers().map((page, index) => (
              <div
                key={index}
                onClick={() => goToPage(page)}
                className={`flex items-center text-lg font-medium font-sans justify-center rounded-full text-neutral-500 border border-neutral-500 h-10 w-10 cursor-pointer ${
                  currentPage === page ? 'bg-green-2-500 text-white text-lg font-medium font-sans shadow-[0_10px_14px_rgba(220,155,107,0.5)]' : ''
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