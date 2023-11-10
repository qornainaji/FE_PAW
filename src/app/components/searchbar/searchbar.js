"use client";

import Button from "../button/button";


export default function SearchBar(){
    return(
        <div className="w-full flex justify-center h-full font-sans">
            <form className="flex w-[90%] max-w-[794px] py-[18px] bg-neutral pl-[20px] rounded-full pr-[8px] relative items-center">
                <input
                type="text" 
                className="w-full font-medium text-[16px] text-neutral-500 placeholder:text-neutral-500"
                placeholder="Cari dokumen kamu disini..."
                />
                <Button
                    className="absolute right-[8px] "
                />
            </form>
        </div>
    );
}