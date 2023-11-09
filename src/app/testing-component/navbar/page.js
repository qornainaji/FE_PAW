import Navbar from "../../components/navbar/navbar"

export default function tesNavbar(){
    return(
        <div className="text-black">
            <Navbar isAdmin={true}/>
            {/* <Navbar isAdmin={false}/> */}
            <div className="bg-green-300 min-h-screen">
                <h1>Testing</h1>
            </div>
        </div>
    )
};