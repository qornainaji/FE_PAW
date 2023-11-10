"use client";



export default function Button({
    text = "Search",
    color = "bg-green-2-500",
    textColor = "text-neutral-50 font-bold text-[16px] font-sans",
    onClick = () => {},
    className = "",
}){
    return(
        <button
        className={`${color} rounded-full py-[8px] px-[24px] ${className}`}
        onClick={onClick}
        >
            <p className={textColor}>{text}</p>
        </button>
    );
}