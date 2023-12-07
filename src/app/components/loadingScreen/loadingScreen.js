import React from 'react';
import Lottie from 'lottie-react';
import animationData from './dragonloading.json';
import Image from 'next/image';
import logo from 'public/images/AcademiaDTETI.png';

const LoadingScreen = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full bg-orange-100 font-sans'>
        <div className='w-[300px] h-auto flex flex-col justify-center items-center'>
            <Image src={logo} className='w-[300px]'/>
            <Lottie className='' animationData={animationData}/>
            <h2 className='text-[30px] font-bold text-neutral-900 animate-pulse'>Loading...</h2>
            <p className='text-[16px] font-medium text-neutral-500 animate-pulse'>Please wait</p>
        </div>
    </div>
  );
};

export default LoadingScreen;
