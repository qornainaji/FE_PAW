export default function LoginPage() {
    return(
        <main className="min-h-screen flex justify-center items-center bg-[#F5E1D3] text-black font-sans">
            <div className="bg-white p-10 rounded-[20px] flex flex-col gap-5">
                <div>
                    <h1 className="text-[30px] text-center">Login</h1>
                    <p>Short Description</p>
                </div>
                <form className="flex flex-col gap-4">
                    <label className="flex flex-col gap-2">
                        Nama/Email
                        <input type="text" className="outline" />
                    </label>
                    <label className="flex flex-col gap-2">
                        Password
                        <input type="password" className="outline" />
                    </label>
                    <button className="mt-2 block bg-green-2-500 text-white py-2 rounded-full">Masuk</button>
                </form>
            </div>
        </main>
    )
}