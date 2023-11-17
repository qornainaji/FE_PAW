import React, { useEffect } from 'react';
import { Card } from 'antd';
import styles from './posts.module.css';
import Image from 'next/image';
import { useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { Meta } = Card;

const Posts = ({ posts }) => {
    let rawDate, formattedDate;
    
    const [hoveredCards, setHoveredCards] = useState({});

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

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {posts.map((post) => (
                    // Format the date to be more readable
                    rawDate = new Date(post.doc_date_upload),
                    formattedDate = `${rawDate.getDate().toString().padStart(2, '0')}/${(rawDate.getMonth() + 1).toString().padStart(2, '0')}/${rawDate.getFullYear()}`,
                    
                    <div data-aos='fade-up-left' className='max-w-sm rounded justify-center items-center flex font-sans text-neutral-1000'
                        key={post._id}    
                        onMouseEnter={() => handleMouseEnter(post._id)}
                        onMouseLeave={() => handleMouseLeave(post._id)}>
                        <Card
                            key={post._id}
                            hoverable
                            style={{
                                width: '90%',
                                height: '95%',
                                borderRadius: '10px',
                                backgroundColor: hoveredCards[post._id] ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
                                boxShadow: hoveredCards[post._id] ? '0 4px 8px rgba(41, 55, 33, 1)' : '0 4px 8px rgba(41, 55, 33, 0)',
                                transition: hoveredCards[post._id] ? 'all 0.3s ease-in-out' : 'all 0.3s ease-in-out',
                                transform: hoveredCards[post._id] ? 'scale(1.05)' : 'scale(1)',
                              }}
                            cover={<Image src="/images/mockup-docs01.png" alt={post.doc_title} borderRadius={10} width={300} height={300} padStart={10}/>}
                        >
                            <Meta title={post.doc_title} description={`Uploaded at ${formattedDate}`} />
                            <p className='font-bold'>{post.doc_major}</p>
                            {/* Limit description to two rows only. If more, use ellipses */}
                            <p className='line-clamp-2'>{post.doc_description}</p>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;
