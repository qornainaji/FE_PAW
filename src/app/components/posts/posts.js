
import React, { useEffect } from 'react';
import { Card } from 'antd';
import styles from './posts.module.css';
import Image from 'next/image';
import { useState, } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import EtalaseCard from '../etalase-card/etalasecard';
import Modal from '../modal/modal';

const { Meta } = Card;

const Posts = ({ posts }) => {
    let rawDate, formattedDate;

    const [hoveredCards, setHoveredCards] = useState({});
    const [filteredDocuments, setFilteredDocuments] = useState([]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
    }, []);

    const handleMouseEnter = (postId) => {
        setHoveredCards((prevHoveredCards) => ({ ...prevHoveredCards, [postId]: true }));
    };

    const handleMouseLeave = (postId) => {
        setHoveredCards((prevHoveredCards) => ({ ...prevHoveredCards, [postId]: false }));
    };

    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleCardClick = (etalaseData) => {
        // Add onClick function here
        // setSelectedDoc(data);
        setModalData(etalaseData);
        setModal(!modal);

    };

    const handleCloseModal = () => {
        setModal(!modal);
    };

    const handleFilteredDocuments = (documents) => {
        setFilteredDocuments(documents)
    }

    return (
        <div className='flex items-center w-full justify-center pt-[60px]'>
            <div className="grid grid-cols-4 gap-x-[20px] gap-y-[40px] w-full justify-items-center max-w-[1200px]">
                {posts.map((post, index) => (
                    // Format the date to be more readable
                    rawDate = new Date(post.doc_date_upload),
                    formattedDate = `${rawDate.getDate().toString().padStart(2, '0')}/${(rawDate.getMonth() + 1).toString().padStart(2, '0')}/${rawDate.getFullYear()}`,

                    <div data-aos='fade-up-bottom' data-aos-delay={`${index * 50}`} className='max-w-sm rounded justify-center items-center flex font-sans text-neutral-1000'
                        key={post._id}
                        onMouseEnter={() => handleMouseEnter(post._id)}
                        onMouseLeave={() => handleMouseLeave(post._id)}>
                        <EtalaseCard key={index} data={post} cardClick = {()=>handleCardClick(post)}/>
                    </div>
                ))}
            </div>
            {modal && <Modal data={modalData} closeModal={handleCloseModal}/>}
        </div>
    );
};

export default Posts;
