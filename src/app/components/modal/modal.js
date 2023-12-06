import Button from "../button/button";
import { IoEye, IoDownloadOutline, IoClose } from "react-icons/io5";


export default function Modal({ data, closeModal }) {

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

const handleCloseModal = () => {
  closeModal();
}

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 font-sans">
      <div className="bg-white p-10 mt-16 rounded-[12px] flex overflow-auto space-x-10">
        {/* Buat preview pdf */}
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
              <Button text="Download"/>
              {/* Button Edit */}
              <Button 
                text='Edit'
                className='group border-[1px] border-green-2-500 hover:border-green-1-500 '
                color='bg-transparent'
                textColor='text-green-2-500 group-hover:text-green-1-500'/>
            </div>
            {/* Button Delete */}
            <Button 
              text='Delete'
              className='group border-[1px] border-green-2-500 hover:border-green-1-500 '
              color='bg-transparent'
              textColor='text-green-2-500 group-hover:text-green-1-500'
            />
          </div>
          {/* <input type="checkbox"/> */}
        </div>
        <IoClose className="text-[24px] text-neutral-700" onClick={handleCloseModal}/>
      </div>
    </div>
  )
}