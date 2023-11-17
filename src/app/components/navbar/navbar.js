// import Link from 'next/link'
// import Image from 'next/image'

// export default function Navbar(){
//     return(
//         <nav className='flex font-sans text-black text-xl justify-between px-[120px] py-[24px] bg-white'>
//             <h1 className='font-bold '>ACADEMIA DTETI</h1>
//             <ul className='flex font-semibold text-[16px] space-x-[72px]'>
//                 <li className='hover:text-green-2-600 transition-colors'>
//                     <Link href="/">
//                         Beranda
//                     </Link>    
//                 </li>
//                 <li className='hover:text-green-2-600 transition-colors'>
//                     <Link href="/dashboard">
//                         Dashboard
//                     </Link>    
//                 </li>
//                 <li className='hover:text-green-2-600 transition-colors'>
//                     <Link href="/verifikasi">
//                         Verifikasi
//                     </Link>    
//                 </li>
//             </ul>
//             <div className='flex space-x-[8px]'>
//                 <p className='text-[16px] font-semibold'>Nama Pegguna</p>
//                 <p className='w-[32px] h-[32px] rounded-full bg-green-600'></p>
//             </div>
//         </nav>
//     )
// }

"use client";
import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import styles from '../../globals.css';

export default function Navbar({ isAdmin }) {
    // Decode the JWT to get the payload
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // The user ID should be available in the decoded token
    const userId = decodedToken._id;
      
    return (
        <div className='sticky-navbar w-full'>
            <nav className='flex font-sans text-xl text-neutral-500 justify-between items-center px-[120px] py-[24px] bg-orange-100'>
                {/* <h1 className='font-bold text-green-1-900'>ACADEMIA DTETI</h1> */}
                <Image src='/images/AcademiaDTETI.png' alt='Logo' width={195.2} height={32} className=''/>
                {isAdmin ? (
                    <ul className='flex font-semibold text-[16px] space-x-[72px]'>
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
                <div className='flex space-x-[8px]'>
                    <p className='text-[16px] font-semibold text-green-1-900'>Nama Pengguna</p>
                    <p className='w-[32px] h-[32px] rounded-full bg-green-600'></p>
                </div>
            </nav>
        </div>
  );
//  return (
//     <nav className={`${styles.navbar} ${isSticky ? styles.sticky : ''}`}>
//       <h1 className='font-bold'>ACADEMIA DTETI</h1>
//       {isAdmin ? (
//         <ul className='flex font-semibold text-[16px] space-x-[72px]'>
//           <li className='hover:text-green-2-600 transition-colors'>
//             <Link href='/'>Beranda</Link>
//           </li>
//           <li className='hover:text-green-2-600 transition-colors'>
//             <Link href='/dashboard'>Dashboard</Link>
//           </li>
//           <li className='hover:text-green-2-600 transition-colors'>
//             <Link href='/verifikasi'>Verifikasi</Link>
//           </li>
//         </ul>
//       ) : null}
//       <div className='flex space-x-[8px]'>
//         <p className='text-[16px] font-semibold'>Nama Pengguna</p>
//         <p className='w-[32px] h-[32px] rounded-full bg-green-600'></p>
//       </div>
//     </nav>
//   );

}
