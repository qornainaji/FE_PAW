"use client";


export default function SearchBar(){
    return(
        <div className="w-full flex justify-center h-full font-sans">
            <form className="w-[90%] max-w-[794px] py-[18px] bg-neutral pl-[20px] rounded-full pr-[8px]">
                <input
                type="text" 
                className="w-full font-medium text-[16px] text-neutral-500 placeholder:text-neutral-500"
                placeholder="Cari dokumen kamu disini..."
                />
            </form>
        </div>
    );
}