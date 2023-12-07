'use client';
import Button from "../button/button";
import { IoEye, IoDownloadOutline, IoClose } from "react-icons/io5";
import Image from "next/image";
import axios from "axios";
import EditModal from './modaledit'
import React, { useState } from 'react';

export default function Modal({ data, closeModal }) {

  const {
    _id,
    doc_title,
    doc_year,
    doc_major,
    doc_description,
    doc_id,
    doc_link,
    doc_view,
    doc_date_upload,
    doc_download,
  } = data;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const mapDocMajor = (major) => {
    const majorMap = {
      tif: 'Teknologi Informasi',
      te: 'Teknik Elektro',
      tb: 'Teknik Biomedis',
      // Add more mappings if needed
    };
    return majorMap[major] || major; // Return the mapped value or the original value if not found
  };

  const mappedMajor = mapDocMajor(doc_major);
  const formattedDate = formatDate(doc_date_upload);

  const [counter, setCounter] = useState(0);

  const [isEditFileInvisible, setEditFileInvisible] = useState(false);

  const handleEditModal = () => {
    setEditFileInvisible(!isEditFileInvisible);
}

  const handleCloseModal = () => {
    closeModal();
  }

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('bg-black')) {
      closeModal();
    }
  }

  const handleDownload = (fileId) => {
    const downloadUrl = `https://drive.google.com/u/1/uc?id=${fileId}&export=download`;
    window.open(downloadUrl, "_self");
  };

  const handleDelete = async (docId) => {
    try {
      const response = await axios.delete(process.env.NEXT_PUBLIC_API_URL + `documents/${docId}`);
      console.log(response.data.message); 
    } catch (error) {
      console.error(error);
    }
    closeModal();
    // Increment a counter to force a re-render
    setCounter(prevCounter => prevCounter + 1);

    // Reload the page after a short delay
    setTimeout(() => {
      window.location.reload();
    }, 500); // Adjust the delay as needed
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 font-sans"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white p-10 mt-16 rounded-[12px] flex overflow-auto space-x-10">
        {/* Buat preview pdf */}
        <div className='relative h-[400px] w-[283px]' >
          <Image
            // src="https://drive.google.com/thumbnail?id=1s6WyScMBfm-wHtHoN3ttmwq46cLHUrwu"
            src={`https://drive.google.com/thumbnail?id=${doc_id}`}
            layout='fill'
            objectFit='cover'
            // width={285}
            // height={185}
            alt='thumbnail-etalase'
            className='rounded-[12px] ring-1 ring-cream-700 '
          />
        </div>
        {/* Buat Data pdf */}
        <div className="w-[449px]">
          <div className="flex space-x-[12px] text-neutral-500 font-semibold text-[16px]">
            <p>{mappedMajor}</p>
            <p>{doc_year}</p>
          </div>
          <h2 className="text-[30px] font-bold text-neutral-900 pb-[12px]">{doc_title}</h2>
          <div className="space-y-[8px] pb-[64px]">
            <p className="text-[14px] font-medium text-neutral-900">{formattedDate}</p>
            <p className="text-[14px] font-medium text-neutral-500">{doc_description}</p>
            <div className="flex items-center space-x-[8px] text-[14px] font-medium text-neutral-500">
              <IoEye className="text-[20px]" />
              <p>Jumlah Pelihat:</p>
              <p className="text-neutral-900">{doc_view}</p>
            </div>
            <div className="flex items-center space-x-[8px] text-[14px] font-medium text-neutral-500">
              <IoDownloadOutline className="text-[20px]" />
              <p>Jumlah Unduh:</p>
              <p className="text-neutral-900">{doc_download}</p>
            </div>
          </div>
          <div className="flex space-x-[133px]">
            <div className="flex space-x-[12px]">
              {/* Button Unduh */}
              <Button text="Download" 
                  onClick={() => handleDownload(doc_id)}
              />
              {/* Button Edit */}
              <Button
                text='Edit'
                className='group border-[1px] border-green-2-500 hover:border-green-1-500 '
                color='bg-transparent'
                textColor='text-green-2-500 group-hover:text-green-1-500'
                onClick={handleEditModal} />
            </div>
            {/* Button Delete */}
            <Button
              text='Delete'
              className='group border-[1px] border-green-2-500 hover:border-green-1-500 '
              color='bg-transparent'
              textColor='text-green-2-500 group-hover:text-green-1-500' 
              onClick={() => handleDelete(_id)}
            />
          </div>
          {/* <input type="checkbox"/> */}
        </div>
        <IoClose className="text-[24px] text-neutral-700" onClick={handleCloseModal} />
      </div>
      {isEditFileInvisible && <EditModal onClose = {handleEditModal} data={data}/>}
    </div>
  )
}