"use client";



export default function SearchButton({
    text = "Search",
    color = "bg-green-2-500",
    textColor = "text-neutral-50",
    onClick = () => {},
    type = "button",
    className = "",
    picture = null, 
}){
    return(
        <button
        className={`${color} rounded-full py-[8px] px-[24px] space-x-[8px] flex items-center transition-colors ${className}`}
        onClick={onClick}
        type = {type}
        >
            <p 
                className={`${textColor}  font-bold text-[16px] font-sans`}
                // className={`${color} rounded-full py-[8px] px-[24px] space-x-[8px] flex items-center ${className}`}
            >
                {text}
            </p>
            {/* Give me example if picture is filled with react icons, than it would render it in the components. Else, it would be as default*/}
            {picture}
        </button>
    );
}