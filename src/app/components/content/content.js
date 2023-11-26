'use client';

import { useState } from "react";
import Button from "../button/button";
import SearchBar from "../searchbar/searchbar";
import Filter from "../filter/filter";
import { IoFilter, IoAddCircleOutline } from "react-icons/io5";
import UploadFile from "../uploadfile/uploadfile";

export default function Content(){

    const [isFilterInvisible, setFilterInvisible] = useState(false);
    const [isUploadFileInvisible, setUploadFileInvisible] = useState(false);

    const handleFilter = () => {
        setFilterInvisible(!isFilterInvisible);
    }
    const handleModal = () => {
        setUploadFileInvisible(!isUploadFileInvisible);
    }

    return(
        <div className="flex flex-col items-center justify-between bg-orange-100 py-[60px] px-[120px] font-sans text-neutral-1000 ">
            <h1 className="font-bold text-[38px] ">Cari dokumen kamu di bawah!</h1>
            <SearchBar/>
            <div className="flex flex-row items-center justify-between w-full mt-[40px] mb-[24px]">
                <div className="flex space-x-[119px]">
                    <p className="font-bold text-[16px] text-neutral-1000 py-[8px] pr-[20px] ">Populer:</p>
                        <div>
                            <button 
                            className="px-[24px] py-[10px] font-semibold text-[14px] truncate text-neutral-500 hover:text-green-2-500 max-w-[200px] hover:bg-neutral transition-colors rounded-[12px] hover:drop-shadow-[0_12px_20px_rgba(220,155,107,0.12)]">
                                Text Aljabar Linear AOWKDAWOKDJOADJWODKJAWODKJAO
                            </button>
                        </div>
                </div>
                <div className="flex flex-row space-x-[21px]">
                    <Button
                        onClick={handleFilter}
                        className="group border-[1px] border-green-2-500 hover:border-green-1-500"
                        text="Filter"
                        color="bg-transparent"
                        textColor="text-green-2-500 group-hover:text-green-1-500"
                        picture={<IoFilter className="text-green-2-500 group-hover:text-green-1-500"/>}
                    />
                    <Button
                        onClick={handleModal}
                        text="Tambah"
                        color="bg-transparent"
                        textColor="text-green-2-500 group-hover:text-green-1-500"
                        className="group border-[1px] border-green-2-500 hover:border-green-1-500"
                        picture={<IoAddCircleOutline className="text-green-2-500 group-hover:text-green-1-500"/>}                        
                    />
                </div>
            </div>
            {isFilterInvisible && <Filter/>}
            {isUploadFileInvisible && <UploadFile onClose = {handleModal}/>}
        </div>
    )
}