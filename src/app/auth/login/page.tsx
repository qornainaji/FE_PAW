"use client";
import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const Login = () => {
  const onFinish = (values) => {
    axios.post(process.env.NEXT_PUBLIC_API_URL + 'users/login', {
      user_email: values.email,
      user_password: values.password,
    }).then((response) => {
      alert(response.data.message);
      // Handle successful login (e.g., redirect to dashboard)
    }).catch((error) => {
      if (error.response && error.response.status === 401) {
        alert("Invalid email or password");
      } else {
        console.error('An error occurred during login:', error);
        alert('An unexpected error occurred. Please try again later.');
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="h-screen min-w-screen bg-orange-100" style={{ backgroundImage: "url('/svg/books.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}>
        <div className="flex justify-center items-center h-10">
            {/* Empty Div */}
        </div>
      <div className="w-1/3 p-1 flex flex-col justify-center items-center bg-neutral-50 rounded-xl gap-0 shadow-xl h-5/6 mx-auto font-sans">
        <img src="/images/AcademiaDTETI.png" className="w-1/2 h-auto" />
        <p className='px-10 text-center font-sans text-neutral-600 mt-5 mb-7'>
          Selamat datang kembali! Silakan masuk ke akun Anda.
        </p>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="font-sans"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input placeholder='Email Anda'/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='Password Anda'/>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-green-2-500 rounded-full mb-0"
              style={{ width: '100%', height: '50px' }}
            >
              Masuk
            </Button>
          </Form.Item>
        </Form>
        <p className="font-sans text-neutral-600">
          Belum punya akun?{' '}
          <a href="/auth/register" className="font-sans text-green-600">
            Daftar
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
