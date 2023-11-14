"use client";



export default function Button({
    text = "Search",
    color = "bg-green-2-500",
    textColor = "text-neutral-50",
    onClick = () => {},
    className = "",
    picture = null, 
}){
    return(
        <button
        className={`${color} rounded-full py-[8px] px-[24px] space-x-[8px] flex items-center ${className}`}
        onClick={onClick}
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