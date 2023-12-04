'use client'
import { useState, useEffect } from "react"
import EtalaseCard from "../etalase-card/etalasecard"

export default function Etalase() { 
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     try {
    //         const response = await fetch("http://localhost:4000/"+"documents/");
    //         const json = await response.json();
    //         setData(json);
    //     } catch (error) {
    //         console.log("Error fetching data: ", error);
    //     }
    // }

    return(
        <div className="grid grid-cols-4 gap-x-[20px] gap-y-[40px] w-full justify-items-center">
            {/* Etalase */}
            {/* <EtalaseCard/> */}
            {data.map((doc, index) => (
                <EtalaseCard key={index} data={doc} />
            ))}
        </div>
    )
}