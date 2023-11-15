"use client";

import Button from "../button/button";
import { IoFilter } from "react-icons/io5";


export default function SearchBar(){
    return(
        <div className="w-full flex justify-center h-full font-sans drop-shadow-[0_12px_20px_rgba(220,155,107,0.24)]">
            <form className="flex w-[90%] max-w-[794px] py-[18px] bg-neutral pl-[20px] rounded-full pr-[8px] relative items-center">
                <input
                type="text" 
                className="w-full font-medium text-[16px] text-neutral-900 placeholder:text-neutral-500 focus:outline-none"
                placeholder="Cari dokumen kamu disini..."
                />
                <Button
                    // className="absolute right-[8px] border-[1px] border-green-2-500"
                    // text="Filter"
                    // color="bg-transparent"
                    // textColor="text-green-2-500"
                    // picture={<IoFilter className="text-green-2-500"/>}
                    className="absolute right-[8px] hover:bg-green-2-600 "
                />
            </form>
        </div>
    );
}