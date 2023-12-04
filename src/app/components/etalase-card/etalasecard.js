import Image from 'next/image'
import {IoEye} from 'react-icons/io5'


export default function EtalaseCard({data}) {
    const {
        doc_title,
        doc_year,
        doc_major,
        doc_description,
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
    
    return(
        <div className="flex flex-col justify-center items-center w-[285px] space-y-[8px] rounded-[12px] hover:drop-shadow-[0_12px_20px_rgba(220,155,107,0.5)] duration-1000 ease-in-out transition-shadow">
            {/* Thumbnail */}
            <div className='relative h-[185px] w-[285px]' >
                <Image
                    // src="https://drive.google.com/thumbnail?id=1s6WyScMBfm-wHtHoN3ttmwq46cLHUrwu"
                    src={`https://drive.google.com/thumbnail?id=${doc_link}`}
                    layout='fill'
                    objectFit='cover'
                    // width={285}
                    // height={185}
                    alt='thumbnail-etalase'
                    className='rounded-[12px] ring-1 ring-cream-700 '
                />
            </div>
            <div className='w-full space-y-1'>
                <h2 className='font-bold text-neutral-900 text-[16px] '>{doc_title}</h2>
                <div className=' text-[12px] flex items-center justify-between'>
                    <div className='flex items-center text-green-2-600 space-x-[8px]'>
                        <p>{mappedMajor}</p>
                        <p>{doc_year}</p>
                    </div>
                    <div className='flex items-center text-orange-600 space-x-[8px] '>
                        {/* icon mata */}
                        <IoEye/>
                        <p>{doc_view}</p>
                    </div>
                </div> 
                <p className='text-[12px] font-medium text-neutral-500 '>{formattedDate}</p> 
            </div>
        </div>
    )
}