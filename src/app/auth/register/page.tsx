"use client"
import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const Register = () => {
  const onFinish = (values) => {
    const isUgmMail = values.email.includes("@mail.ugm.ac.id");

    if (!isUgmMail) {
      alert("Please register using UGM mail");
      return; // Stop the registration process if the email is not from UGM
    }

    axios.post(process.env.NEXT_PUBLIC_API_URL + 'users/register', {
      user_name: values.name,
      user_email: values.email,
      user_password: values.password,
      user_NIM: values.nim,
      user_isAdmin: false,
    }).then((response) => {
      alert(response.data.message);
    }).catch((error) => {
        if (error.response && error.response.status === 400) {
            alert(error.response.data.message);
        } else {
            console.error('An error occurred during registration:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const validateUgmEmail = (rule, value) => {
    if (value && (!value.includes("@mail.ugm.ac.id") || value.includes("@ugm.ac.id") || value.includes("@365.ugm.ac.id"))) {
      return Promise.reject("Please register using UGM mail");
    }
    return Promise.resolve();
  };

  return (
    <div className="h-screen min-w-screen bg-orange-100" style={{ backgroundImage: "url('/svg/books.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}>
        <div className="flex justify-center items-center h-10">
            {/* Empty Div */}
        </div>
      <div className="w-1/3 p-1 flex flex-col justify-center items-center bg-neutral-50 rounded-xl gap-0 shadow-xl h-5/6 mx-auto font-sans">
        <img src="/images/AcademiaDTETI.png" className="w-1/2 h-auto" />
        <p className='px-10 text-center font-sans text-neutral-600 mt-5 mb-7'>
        Langkah pertama menuju pengalaman belajar yang komprehensif!
        </p>
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="font-sans"
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input placeholder='Kimi no namae wa?'/>
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    { validator: validateUgmEmail }
                ]}
            >
                <Input placeholder='CanItBeatGokuTho@gmail.com'/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password placeholder='Pasuwado ni ore wa naru!'/>
            </Form.Item>

            <Form.Item
                label="NIM"
                name="nim"
                rules={[{ required: true, message: 'Please input your NIM!' }]}
            >
                <Input placeholder='BakaSlayerID69'/>
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-green-2-500 rounded-full mb-0"
                    style={{ width: '100%', height: '50px' }}
                >
                    Daftar
                </Button>
            </Form.Item>
        </Form>
        <p className="font-sans text-neutral-600">
            Sudah punya akun?{' '}
            <a href="/auth/login" className="font-sans text-green-600">
                Masuk
            </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
