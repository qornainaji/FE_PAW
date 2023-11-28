"use client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/navbar/navbar';
import React, {useState, useEffect} from 'react';
import cookieCutter from 'cookie-cutter';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { Form, Input, Button, Typography, ConfigProvider } from 'antd';
import CustomAlert from '../components/CustomAlert/CustomAlert';
import { GithubOutlined } from '@ant-design/icons';
import FadeIn from '../animations/FadeIn';
import Head from 'next/head';

const { Title } = Typography;

const Profile = () => {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [NIM, setNIM] = useState(null);
    const [isVerified, setIsVerified] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(cookieCutter.get('token')) {
            setToken(cookieCutter.get('token'));
        // console.log(token);
        if(token)
        {
            const decodedToken = jwt.decode(token);
            setId(decodedToken._id);
            
            try {
                axios.get(process.env.NEXT_PUBLIC_API_URL + 'users/' + decodedToken._id, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((response) => {
                    // console.log(response.data.user_name);
                    setUsername(response.data.user_name);
                    setEmail(response.data.user_email);
                    setNIM(response.data.user_NIM);
                    setIsVerified(response.data.isVerified);
                    setLoading(false);
                })
            }
            catch (error) {
                console.error('Error fetching user:', error);
                setLoading(false);
            }
        }
    }
    }, [token])

    return (
        <div className='flex flex-col font-sans bg-orange-100 text-neutral-1000 w-auto h-fill min-h-screen'>
            <div className='flex flex-col h-fit bg-orange-100 text-neutral-1000'>
                <Head>
                    <title>Profile</title>
                    <meta name="description" content="Profile" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Navbar isAdmin={true}/>
            </div>

            {/* Forms */}
            <div className="flex flex-col items-center justify-center w-fill h-fit min-h-full mb-10 py-5">
                <h2 className="text-4xl font-bold mb-5">Profile</h2>
                {loading ? (
                    <div className='text-2xl mt-5'>Loading . . . </div>
                 ) : (
                    <Form
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                    >
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#48A516',
                                },
                            }}
                        >
                        
                        {/* Create forms pre-filled with the data from the user */}
                        <Form.Item
                            label="ID"
                            name="id"
                            initialValue={id}
                        >
                            <Input disabled={true}/> 
                        </Form.Item>

                        <Form.Item
                            label="Username"
                            name="username"
                            initialValue={username}
                        >
                            <Input disabled={true}/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            initialValue=""
                        >
                            <Input.Password disabled={true} placeholder='See "Change Password"'/>
                            <Link href="/profile/change-password">
                                Change Password
                            </Link>
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            initialValue={email}
                        >
                            <Input disabled={false}/>
                        </Form.Item>

                        <Form.Item
                            label="NIM"
                            name="NIM"
                            initialValue={NIM}
                        >
                            <Input disabled={false}/>
                        </Form.Item>

                        <Form.Item
                            label="Verified"
                            name="verified"
                            initialValue={isVerified}
                        >
                            <Input disabled={true}/>
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-green-2-500 rounded-full mb-0 font-bold"
                            style={{ width: '100%', minHeight: '50px' }}
                        >
                            Save
                        </Button>


                        </ConfigProvider>
                    </Form>
                 )}
            </div>
        </div>
    )
}

export default Profile;