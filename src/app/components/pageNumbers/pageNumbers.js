// PageNumbers.js

import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';


const PageNumbers = ({ currentPage, totalPages, limit }) => {
    useEffect(() => {
        // Aos init, with duration of 500 and show from side
        Aos.init();
    }, []);

    return (
        <div className='flex justify-center items-center mt-10'>
            {Array.from({ length: totalPages }, (_, index) => (
                <a key={index + 1} href={`/dashboard?page=${index + 1}${limit ? `&limit=${limit}` : ''}`}>
                    <div className={`flex items-center justify-center h-10 w-10 mr-1 rounded-full bg-green-2-500 text-white font-sans cursor-pointer 
                    ${currentPage === index + 1 ? 'bg-green-600' : ''}`}
                    data-aos="fade-right" 
                    data-aos-duration="500" 
                    data-aos-anchor-placement="top-bottom">
                        {index + 1}
                    </div>
                </a>
            ))}
        </div>
    );
};

export default PageNumbers;
