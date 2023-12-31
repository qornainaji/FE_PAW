"use client";
require('dotenv').config();
import Link from 'next/link';
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import Image from 'next/image';
import styles from '../../globals.css';
import axios from 'axios';
import { Router, useRouter } from 'next/navigation';
import cookieCutter from 'cookie-cutter';
import { Modal, Button } from 'antd';
import FadeIn from '../../animations/FadeIn';
import Lottie from 'lottie-react';
import animationData from '../loadingScreen/dragonloading.json';


const jwt = require('jsonwebtoken');

const CustomModal = forwardRef((props, ref) => {
        const { open, onCancel, children, ...rest } = props;
        return (
            <Modal
                {...rest}
                open={open}
                onCancel={onCancel}
                footer={null}
                closable={true}
                closeIcon={<span className="custom-close-icon ml-7 -mt-5">X</span>} // Update the close icon here
                mask={true}
                maskClosable={true}
                width={220}
                style={{ position: 'absolute', top: '80px', right: '118px', zIndex: '9999' }}
                getContainer={false}
                modalRoot={() => document.getElementById('modal-root')}
                ref={ref}
                cursor='default'
                onMouseLeave={onCancel}
            >
                {children}
            </Modal>
        );
});

export default function Navbar({ isAdmin }) {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [pictureUrl, setPictureUrl] = useState('/images/default-avatar.png');
    const [animationIsPlaying, setAnimationIsPlaying] = useState(false);
    
    const currentPathname = typeof window !== 'undefined' ? window.location.pathname : null;

    const handleMouseEnter = () => {
        setShowModal(true);
    }

    const handleMouseClick = () => {
        setShowModal(!showModal); // Toggle the modal visibility on click
    }

    const handleMouseLeave = () => {
        setShowModal(false);
    }

    const modalRef = useRef(null);


    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setShowModal(false);
            }
        };

        if (showModal) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showModal]);

    useEffect(() => {
        if(cookieCutter.get('token')) {
            setToken(cookieCutter.get('token'));
        console.log("Token: " + token);
        if(token)
        {
            const decodedToken = jwt.decode(token);
            setId(decodedToken._id);
            isAdmin = decodedToken.user_isAdmin;
            // console.log("isAdmin: " + isAdmin);
            // console.log("Decoded: " + JSON.stringify(decodedToken));
        } 
    }
    }, [token])

    useEffect(() => {
        if(id) {
            // fetch user.username
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                // console.log(res.data);
                setName(res.data.user_username);
                if(res.data.user_avatarURL != null)
                    setPictureUrl(res.data.user_avatarURL);

                console.log(pictureUrl);
            })
        }
    }, [id])

    const handleLogoClick = () => {
        // if path is already /, then show loading screen
        // else, push to /
        if(currentPathname == '/')
        {
            setAnimationIsPlaying(true);
            
            // animate the dragon moving from left to right inside div with name 'dragon-frame'


            // delay 5 seconds
            setTimeout(() => {
                setAnimationIsPlaying(false);
            }, 6000);
        }
        else
            router.push('/');
    }
      
    return (
        <FadeIn>
            {/* if animationIsPlaying is true, show the dragon going from left to right */}
            {animationIsPlaying && (
                <div name="dragon-frame" className='fixed flex justify-center items-center w-screen h-fit bg-transparent'>
                    <div className='w-[300px] h-auto flex flex-col justify-center items-center'>
                        <Lottie className='translate-x-full' 
                                animationData={animationData}
                                styles={{}} />
                    </div>
                </div>
            )}
            <div className='sticky-navbar w-full'>
                {/* {token} */}
                {/* {id} */}
                <nav className='flex font-sans text-xl text-neutral-500 justify-between items-center px-[120px] py-[0px] bg-orange-100'>
                    {/* <h1 className='font-bold text-green-1-900'>ACADEMIA DTETI</h1> */}
                    <div className='flex items-center'>
                        <Image src='/images/AcademiaDTETI.png' alt='Logo' width={195.2} height={32} className='mb-2 items-center justify-center' onClick={handleLogoClick} />
                        {isAdmin && <p className='ml-2 font-semibold text-green-1-900 items-center justify-center'>Admin</p>}
                    </div>
                    {isAdmin ? (
                        <ul className='flex font-semibold 
                        text-[16px] lg:space-x-[72px]'>
                        <li className='hover:text-green-2-600 transition-colors'>
                            <Link href='/'>Beranda</Link>
                        </li>
                        <li className='hover:text-green-2-600 transition-colors'>
                            <Link href='/dashboard'>Dashboard</Link>
                        </li>
                        <li className='hover:text-green-2-600 transition-colors'>
                            <Link href='/verifikasi'>Verifikasi</Link>
                        </li>
                        </ul>
                    ) : null}
                    <div
                        onClick={handleMouseClick} // Handle the click event
                        className='flex h-full py-6 px-6 hover:bg-green-2-200 transition-all relative cursor-pointer'
                    >
                        <div className='flex space-x-[8px]'>
                            <p className='text-[16px] font-semibold text-green-1-900'>Halo, {name}</p>
                            <Image 
                                src={pictureUrl} 
                                alt='Avatar'
                                width={32} 
                                height={32} 
                                className='w-[32px] h-[32px] rounded-full bg-white'/>
                        </div>
                        <CustomModal
                            open={showModal}
                            onCancel={() => setShowModal(false)}
                            onMouseLeave={() => setShowModal(false)}
                            ref={modalRef}
                            
                        >
                            <div>
                            <Button block type='primary' size='large' className='bg-green-2-600 hover:orange-100 mb-2 transition-colors' onClick={() => router.push('/profile')}>
                                Profile
                            </Button>
                            <Button block danger type='primary' size='large' onClick={() => {
                                cookieCutter.set('token', '');
                                router.push('/auth/login');
                            }}>
                                Sign Out
                            </Button>
                            </div>
                        </CustomModal>
                    </div>
                    
                </nav>
            </div>
        </FadeIn>
  );

}
