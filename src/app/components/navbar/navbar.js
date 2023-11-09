import Link from 'next/link'

export default function Navbar(){
    return(
        <nav className='flex font-sans text-3xl'>
            <h1 className='font-bold '>ACADEMIA DTETI</h1>
            <ul className='flex font-semibold text-[16px]'>
                <li>
                    <Link href="/">
                        Beranda
                    </Link>    
                </li>
                <li>
                    <Link href="/dashboard">
                        Dashboard
                    </Link>    
                </li>
                <li>
                    <Link href="/verifikasi">
                        Verifikasi
                    </Link>    
                </li>
            </ul>
            <div>
                <p>Nama Pegguna</p>
                <p></p>
            </div>
        </nav>
    )
}