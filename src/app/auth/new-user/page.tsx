// pages/new-user.tsx
"use client";
import React from 'react';
import axios from 'axios';
import {useState} from 'react';

const NewUserPage: React.FC = () => {
    const [nama, setNama] = useState("");
    const [password, setPassword] = useState("");
    return(
        <main className="min-h-screen flex justify-center items-center bg-orange-100 text-black font-sans">
            <div className="bg-white p-10 rounded-[20px] flex flex-col gap-5">
                <div>
                    <h1 className="text-[30px] text-center">Sign Up</h1>
                    <p>Register and Learn!</p>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    console.log(
                        {
                            user_name: nama,
                            user_password: password
                        }
                    )
                    axios.post("http://localhost:4000/" + "users/login", {
                        user_name: nama,
                        user_password: password
                    }).then(() => {
                        alert(`success, welcome ${nama}`)
                    }).catch((err) => {
                        console.log(err.message)
                        alert("gagal")
                    })
                }} className="flex flex-col gap-4">
                    <label className="flex flex-col gap-2">
                        Nama/Email
                        <input type="text" className="outline" value={nama} onChange={(e) => {setNama(e.target.value)}} />
                    </label>
                    <label className="flex flex-col gap-2">
                        Password
                        <input type="password" className="outline" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button type="submit" className="mt-2 block bg-green-2-500 text-white py-2 rounded-full">Masuk</button>
                </form>
            </div>
        </main>
    )
};

export default NewUserPage;
