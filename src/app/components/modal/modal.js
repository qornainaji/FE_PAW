import Button from "../button/button";
import { IoEye, IoDownloadOutline } from "react-icons/io5";


export default function Modal() {

  // const {
  //   doc_title,
  //   doc_year,
  //   doc_major,
  //   doc_description,
  //   doc_link,
  //   doc_view,
  //   doc_date_upload,
  //   doc_download,
  // } = data;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 font-sans">
      <div className="bg-white p-10 mt-16 rounded-[12px] flex flex-row-reverse overflow-auto">
        {/* Buat preview pdf */}
        {/* Buat Data pdf */}
        <div className="w-[449px]">
          <div className="text-neutral-500 font-semibold text-[16px]">
            <p>Teknologi Informasi</p>
            <p>2023</p>
          </div>
          <h2 className="text-[30px] font-bold text-neutral-900 pb-[12px]">Lorem ipsum dolor sit amet, consectetur</h2>
          <div className="space-y-[8px] pb-[64px]">
            <p className="text-[14px] font-medium text-neutral-900">10-04-2003</p>
            <p className="text-[14px] font-medium text-neutral-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus</p>
            <div className="flex items-center space-x-[8px] text-[14px] font-medium text-neutral-500">
              <IoEye className="text-[20px]" />
              <p>Jumlah Pelihat:</p>
              <p className="text-neutral-900">48</p>
            </div>
            <div className="flex items-center space-x-[8px] text-[14px] font-medium text-neutral-500">
              <IoDownloadOutline className="text-[20px]" />
              <p>Jumlah Unduh:</p>
              <p className="text-neutral-900">48</p>
            </div>
          </div>
          <div className="flex space-x-[133px]">
            <div className="flex space-x-[12px]">
              {/* Button Unduh */}
              <Button />
              {/* Button Edit */}
              <Button />
            </div>
            {/* Button Delete */}
            <Button />
          </div>
        </div>
      </div>
    </div>
  )
}