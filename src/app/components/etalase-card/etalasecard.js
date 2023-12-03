import Image from 'next/image'
import {IoEye} from 'react-icons/io5'

export default function EtalaseCard() {
    return(
        <div className="flex flex-col justify-center items-center w-[285px] space-y-[8px] rounded-[12px] hover:drop-shadow-[0_12px_20px_rgba(220,155,107,0.5)] duration-1000 ease-in-out transition-shadow">
            {/* Thumbnail */}
            <div className='relative h-[185px] w-[285px]'>
                <Image
                    // src="https://drive.google.com/file/d/1s6WyScMBfm-wHtHoN3ttmwq46cLHUrwu/view?usp=drivesdk"
                    src="https://drive.google.com/thumbnail?id=1s6WyScMBfm-wHtHoN3ttmwq46cLHUrwu"
                    // src="https://drive.google.com/uc?export=view&id=1s6WyScMBfm-wHtHoN3ttmwq46cLHUrwu"
                    layout='fill'
                    objectFit='cover'
                    // width={285}
                    // height={185}
                    alt='thumbnail-etalase'
                    className='rounded-[12px] ring-1 ring-cream-700 '
                />
                {/* <img 
                    src="https://drive.google.com/thumbnail?id=1s6WyScMBfm-wHtHoN3ttmwq46cLHUrwu" 
                    alt="Thumbnail" 
                    className='rounded-[12px] ring-1 ring-cream-700 w-[285px] h-[185px]'
                /> */}
                {/* <div 
                    className= 'bg-cover bg-center rounded-[12px] ring-1 ring-cream-700 w-[285px] h-[185px]' style={{backgroundImage: url("https://drive.google.com/thumbnail?id=1s6WyScMBfm-wHtHoN3ttmwq46cLHUrwu")}}></div> */}
            </div>
            <div className='w-full space-y-1'>
                <h2 className='font-bold text-neutral-900 text-[16px] '>Soal UTS Basis Data</h2>
                <div className=' text-[12px] flex items-center justify-between'>
                    <div className='flex items-center text-green-2-600 space-x-[8px]'>
                        <p>Teknologi Informasi</p>
                        <p>2021</p>
                    </div>
                    <div className='flex items-center text-orange-600 space-x-[8px] '>
                        {/* icon mata */}
                        <IoEye/>
                        <p>1.248</p>
                    </div>
                </div> 
                <p className='text-[12px] font-medium text-neutral-500 '>10-04-2023</p> 
            </div>
        </div>
    )
}