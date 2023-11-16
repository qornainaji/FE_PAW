"use client"
import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const Register = () => {
  const onFinish = (values) => {
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

  return (
    <div className="h-screen min-w-screen bg-green-2-200">
        <div className="flex justify-center items-center h-10">
            {/* Empty Div */}
        </div>
      <div className="w-1/2 p-1 flex flex-col justify-center items-center bg-neutral-50 rounded-xl gap-0 shadow-xl h-5/6 mx-auto ">
        <img src="/images/AcademiaDTETI.png" className="w-1/2 h-auto" />
        <p className='font-sans text-neutral-600 mt-5 mb-7'>
        Langkah pertama menuju pengalaman belajar yang komprehensif!
        </p>
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="NIM"
                name="nim"
                rules={[{ required: true, message: 'Please input your NIM!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className='bg-green-2-500 rounded-full mb-0' style={{ width: '100%' }}>
                Daftar
                </Button>
            </Form.Item>
        </Form>
        <a href="/auth/login" className='font-sans text-green-600' style={{ border: '1px solid black' }}>
          Sudah punya Akun? Masuk
        </a>
      </div>
    </div>
  );
};

export default Register;
