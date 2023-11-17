import React from 'react';

const seebookmodal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-50">
      <div className="bg-white w-3/4 md:w-1/2 lg:w-3/5 p-6 rounded-lg flex">
        {/* Placeholder Gambar di Sebelah Kiri */}
        <div className="w-2/9 p-6">
          <img  
            src="..\images\Placeholder_Dokumen.png"
            alt="Placeholder Gambar"
            className="w-full h-full"
          />
        </div>

        {/* Konten Tulisan dan Tombol di Sebelah Kanan */}
        <div className="w-3/6 pt-6 pb-6 pl-6">
          <p className='text-gray-500 text-xl'>Teknologi Informasi 2023</p>
          <h1 className="text-5xl font-bold mt-4">Lorem ipsum dolor sit amet, consectetur</h1>
          <div className='flex flex-row mt-4'>
            <p>10-04-2003</p>
            <p className='ml-8'>Author Name</p>
          </div>
          <p className="text-gray-500 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus</p>
          <div className='mt-2'>
            <p className='text-gray-500'>Jumlah Pelihat : 48</p>
            <p className='text-gray-500'>Jumlah Unduh : 48</p>
          </div>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-full mt-12 w-32 h-12"
            onClick={() => onClose()}
          >
            Close
          </button>
          
        </div>
        <div className=' w-1/6'>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => onClose()}
        >
          Close
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default seebookmodal;
