"use client";
import React, { useState } from 'react';
import { Form, Input, Button, Typography, ConfigProvider, message } from 'antd';
import axios from 'axios';
import CustomAlert from '../../components/CustomAlert/CustomAlert';
import { GithubOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import FadeIn from '../../animations/FadeIn';
import cookieCutter from 'cookie-cutter';

const { Title } = Typography;

const Login = () => {
    const [githubSignInMessage, setGithubSignInMessage] = useState(null);
    const router = useRouter();

    const handleGitHubSignIn = async () => {
        // setGithubSignInMessage('Signing in with GitHub...');
        message.loading('Signing in with GitHub...', 0);
        const githubURL = process.env.NEXT_PUBLIC_API_URL + 'auth/signup/github';
        try{
            router.push(githubURL);
        } catch (error) {
            console.error('Error signing in with GitHub:', error);
            message.destroy();
            message.error('Error signing in with GitHub');
            setGithubSignInMessage('Error signing in with GitHub');
        }
    };

  const onFinish = (values) => {
    // If email includes "@ * . *", treat it as an email. If not,
    // treat it as a username.
    const isEmail = values.email.includes('@') && values.email.includes('.');

    message.loading('Logging in...', 0);

    if(isEmail) { // If email
        axios.post(process.env.NEXT_PUBLIC_API_URL + 'users/login', {
        user_email: values.email,
        user_password: values.password,
        withCredentials: true,
        Credentials: 'include',
        }).then((response) => {
            message.destroy();
            // Handle successful login (e.g., redirect to dashboard)
            // alert(response.data.message + "\nWelcome, " + response.data.user.user_name + "!");
            
            // document.cookie = "token=" + response.data.token;
            cookieCutter.set('token', response.data.token);
            
            const currentUrl = window.location.href;
            const urlObject = new URL(currentUrl);
            const callbackUrl = urlObject.searchParams.get('callbackUrl') || '/';
            router.push(callbackUrl);
        }).catch((error) => {
            if (error.response && error.response.status === 401) {
                // alert("Invalid email or password");
                message.error('Invalid email or password');
            } else {
                console.error('An error occurred during login:', error);
                message.error('An error occurred during login');
                // alert('An unexpected error occurred. Please try again later.');
            }
        });
    } else { // if username
        axios.post(process.env.NEXT_PUBLIC_API_URL + 'users/login', {
        user_username: values.email,
        user_password: values.password,
        withCredentials: true,
        Credentials: 'include',
        }).then((response) => {
            message.destroy();
            // message.success(response.data.message);
            // alert(response.data.message + "\nWelcome, " + response.data.user.user_name + "!");
            // insert token to cookie
            cookieCutter.set('token', response.data.token);

            // Handle successful login (e.g., redirect to dashboard)
            const currentUrl = window.location.href;
            const urlObject = new URL(currentUrl);
            const callbackUrl = urlObject.searchParams.get('callbackUrl') || '/';
            router.push(callbackUrl);
        }).catch((error) => {
            if (error.response && error.response.status === 401) {
                // alert("Invalid username or password");
                message.error('Invalid username or password');
            } else {
                console.error('An error occurred during login:', error);
                // alert(error.message);
                message.error('An error occurred during login');
            }
        });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Login failed');
    message.error(errorInfo);
  };

  return (
    <FadeIn>
        <div className="h-screen min-w-screen bg-orange-100" style={{ backgroundImage: "url('/svg/books.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover", minHeight:"700px" }}>
            <div className="flex justify-center items-center h-10">
                {/* Empty Div */}
            </div>
        <div className="w-1/3 p-1 flex flex-col justify-center items-center bg-neutral-50 rounded-xl gap-0 shadow-xl h-5/6 mx-auto font-sans">
            <img src="/images/AcademiaDTETI.png" className="w-1/2 h-auto" />
            <p className='px-10 text-center font-sans text-neutral-600 mt-5 mb-2'>
            Selamat datang kembali! Silakan masuk ke akun Anda.
            </p>
            <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="!font-sans"
            labelCol={{ span: 24 }} // Adjust the span value based on your layout preference
            wrapperCol={{ span: 24 }} // Adjust the span value based on your layout preference
            >
            <ConfigProvider 
                theme={{
                    token: {
                    // Seed Token
                    colorPrimary: '#48A516',
                    },
                }}
            >
                <Form.Item
                    label="Email/Username"
                    name="email"
                    className='!font-sans'
                    rules={[
                    { required: true, message: 'Please input your email/username!' },
                    //   { type: 'email', message: 'Please enter a valid email address' },
                    ]}
                    style={{ marginBottom: '0px', marginTop: '0px' }
                    }
                >
                    <Input placeholder='Email/Username'/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder='Secret Password!'/>
                </Form.Item>

                <Form.Item>
                    <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-green-2-500 rounded-full mb-0"
                    style={{ width: '100%', height: 'auto' }}
                    >
                    Masuk
                    </Button>
                </Form.Item>
            </ConfigProvider>
            {/* line break with "or" */}
                <div className="flex justify-center items-center mb-5">
                    <div className="border-t border-neutral-300 w-1/3"></div>
                    <p className="text-neutral-600 px-2">atau</p>
                    <div className="border-t border-neutral-300 w-1/3"></div>
                </div>

                {/* Sign in with Github */}
                <Form.Item>
                    <Button
                        type="primary"
                        className="bg-neutral-800 rounded-full mb-0"
                        style={{ width: '100%', height: 'auto' }}
                        icon={<GithubOutlined />}
                        onClick={handleGitHubSignIn}
                    >
                        Masuk dengan Github
                    </Button>
                </Form.Item>

                {/* Display the message */}
                {githubSignInMessage && (
                    <p className="font-sans text-neutral-600">
                    {githubSignInMessage}
                    </p>
                )}

            </Form>
            <p className="font-sans text-neutral-600">
            Belum punya akun?{' '}
            <a href="/auth/register" className="font-sans text-green-600">
                Daftar
            </a>
            </p>
        </div>
        </div>
    </FadeIn>
  );
};

export default Login;
