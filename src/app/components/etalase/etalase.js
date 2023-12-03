import EtalaseCard from "../etalase-card/etalasecard"

export default function Etalase() { 
    return(
        <div className="grid grid-cols-4 gap-x-[20px] gap-y-[40px] w-full justify-items-center">
        {/* <div> */}
            {/* Etalase */}
            <EtalaseCard/>
            {/* <EtalaseCard/>
            <EtalaseCard/>
            <EtalaseCard/>
            <EtalaseCard/> */}
        </div>
    )
}