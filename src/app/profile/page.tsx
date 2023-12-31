"use client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/navbar/navbar';
import React, {useState, useEffect} from 'react';
import cookieCutter from 'cookie-cutter';
import jwt from 'jsonwebtoken';
import axios, { all } from 'axios';
import { Form, Input, Button, Typography, ConfigProvider, Image, message } from 'antd';
import FadeIn from '../animations/FadeIn';
import Head from 'next/head';
import { checkAuthentication } from '../auth/checkAuthentication';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from '../components/loadingScreen/loadingScreen';

const bcrypt = require('bcryptjs');

const { Title } = Typography;

const Profile = () => {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [avatar, setAvatar] = useState('/images/default-avatar.png');
    const [id, setId] = useState(null);
    const [username, setUsername] = useState(null);
    const [name, setName] = useState(null);
    // const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [NIM, setNIM] = useState(null);
    const [github, setGithub] = useState(null);
    const [bio, setBio] = useState(null);
    const [location, setLocation] = useState(null);
    const [isVerified, setIsVerified] = useState(null);
    const [loading, setLoading] = useState(true);

    const [changePasswordState, setChangePasswordState] = useState(false);
    const [newPassword, setNewPassword] = useState(null);

    useEffect(() => {
        checkAuthentication( router );
      }, [])

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
                    if(response.data.user_avatarImage != null)
                    {
                        var buffer = Buffer.from(response.data.user_avatarImage.data);
                        var blob = new Blob([buffer], {type: "image/png"});
                        var urlCreator = window.URL || window.webkitURL;
                        var imageUrl = urlCreator.createObjectURL(blob);
                        setAvatar(imageUrl);
                    }
                    else
                    {
                        if (response.data.user_avatarURL != null)
                            setAvatar(response.data.user_avatarURL);
                    }
                    
                    setUsername(response.data.user_username);
                    setName(response.data.user_name);
                    setBio(response.data.user_bio);
                    setLocation(response.data.user_location);
                    setEmail(response.data.user_email);
                    setNIM(response.data.user_NIM);
                    setGithub(response.data.user_github);
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


    const validateUgmEmail = (rule, value) => {
        if (value && (!value.includes("@mail.ugm.ac.id") || value.includes("@ugm.ac.id") || value.includes("@365.ugm.ac.id"))) {
        return Promise.reject("Please register using UGM mail");
        }
        return Promise.resolve();
    };

    // Update profile based on the form
    const updateProfile = async () => {
        const data = {
            _id: id,
            user_email: email,
            user_NIM: NIM,
            user_avatarURL: avatar,
            user_username: username,
            user_name: name,
            user_bio: bio,
            user_github: github,
            user_location: location,
        };
        // console.log(data);

        try {
            // Update the data
            const response = await axios.patch(process.env.NEXT_PUBLIC_API_URL + 'users/' + id, data, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            // Alert the whole data
            alert(JSON.stringify(response.data));

            alert("Profile updated successfully!")

            // Refresh the page
            window.location.reload();
        } catch(error) {
            if (error.response && error.response.status === 400) {
                // successToast(error.response.data.message);
                alert(error.response.data.error);

            } else {
                console.error('An error occurred during registration:', error);
                alert('An unexpected error occurred. Please try again later.');
            }
        };
    };

    const handlePasswordChanged = async ( newPassword ) => {
        message.loading({ content: 'Updating Password...', key: 'passwordChange' });
        const salt = await bcrypt.genSalt(10);
        var hashedPassword = await bcrypt.hash(newPassword, salt);
        const data = {
            _id: id,
            user_password: hashedPassword,
        };

        try {
            // Update the data
            const response = await axios.patch(process.env.NEXT_PUBLIC_API_URL + 'users/' + id, data, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.user_password == hashedPassword) {
                message.destroy('passwordChange');
                message.success({ content: 'Password updated successfully!', key: 'passwordChange', duration: 2 });
                alert("Password updated successfully!")
                // alert("Password updated successfully!\n" + "Sent password: " + hashedPassword + "\nCurr password: " + response.data.user_password)
                
                // use toast
                toast.success("Password updated successfully!", {
                    position: toast.POSITION.TOP_CENTER
                });
                setChangePasswordState(false);
            } else {
                message.destroy('passwordChange');
                message.error({ content: 'Password update failed!', key: 'passwordChange', duration: 2 });
                alert("Password update failed!")
                // alert("Password update failed!\n" + "Sent password: " + hashedPassword + "\nCurr password: " + response.data.user_password)
            }

            // alert(JSON.stringify(response.data));

        } catch(error) {
            if (error.response && error.response.status === 400) {
                // successToast(error.response.data.message);
                alert(error.response.data.error);

            } else {
                console.error('An error occurred during password change', error);
                alert('An unexpected error occurred. Please try again later.');
            }
            message.error({ content: 'Password update failed!', key: 'passwordChange', duration: 2 });
        };
    };

    const handleProfileImageChange = async (e) => {
        // Get the file from the input
        const file = e.target.files[0];
        
        // Convert the file to base64 text
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Make a fileInfo Object
            const fileInfo = {
                name: file.name,
                type: file.type,
                size: Math.round(file.size / 1000) + ' kB',
                base64: reader.result as string,
                file: file,
            };

            // Check if the image is not in a 1:1 ratio
            const img = document.createElement('img');
            img.src = fileInfo.base64;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const minSize = Math.min(img.width, img.height);
                const offsetX = (minSize - img.width) / 2;
                const offsetY = (minSize - img.height) / 2;

                // Set canvas size to 1:1 ratio
                canvas.width = minSize;
                canvas.height = minSize;

                // Draw the image on the canvas
                ctx.drawImage(img, offsetX, offsetY);

                // Get the cropped image as base64
                const croppedBase64 = canvas.toDataURL(fileInfo.type);

                // Set the cropped image to the state
                setAvatar(croppedBase64);

                try {
                    // Update the data
                    const response = axios.patch(process.env.NEXT_PUBLIC_API_URL + 'users/' + id, { user_avatarImage: croppedBase64 }, {
                        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', CrossOrigin: 'true', AccessControlAllowOrigin: '*'}
                    });
                    
                    // Alert the whole data
                    console.log(response);

                    // Refresh the page
                    // window.location.reload();
                } catch(error) {
                    if (error.response && error.response.status === 400) {
                        // successToast(error.response.data.message);
                        alert(error.response.data.error);

                    } else {
                        console.error('An error occurred during registration:', error);
                        alert('An unexpected error occurred. Please try again later.');
                    }
                };
            };
        };
    }

    return (
        // Loading screen\
        <FadeIn>
            {loading ? (
                <div className="flex flex-col h-fit bg-orange-100 min-h-screen">
                    <div className={`fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center bg-white visible`}>
                        <LoadingScreen />
                    </div>
                </div>
            ) : (
                <div className='flex flex-col font-sans bg-orange-100 text-neutral-1000 w-auto h-fill min-h-screen pt-24'>
                        {/* Navbar */}
                    <div className='flex flex-col h-fit bg-orange-100 text-neutral-1000'>
                        <Head>
                            <title>Profile</title>
                            <meta name="description" content="Profile" />
                            <link rel="icon" href="/favicon.ico" />
                        </Head>
                        <Navbar isAdmin={true}/>
                    </div>

                    <div className='flex justify-center align-middle items-center w-fill'>
                        {/* Forms */}
                        <div className="flex flex-col items-center justify-center w-5/6 h-fit min-h-full mb-10 py-7 bg-white rounded-2xl">
                            <h2 className="text-4xl font-bold mb-5">Profile</h2>
                                <Form
                                    name="basic"
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    initialValues={{ remember: true }}
                                    onValuesChange={(changedValues, allValues) => {
                                        console.log(allValues);
                                        setEmail(allValues.email);
                                        setNIM(allValues.NIM);
                                        setUsername(allValues.username);
                                        setName(allValues.name);
                                        setBio(allValues.bio);
                                        setLocation(allValues.location);
                                        setGithub(allValues.githubURL);
                                    }}
                                >
                                    <ConfigProvider
                                        theme={{
                                            token: {
                                                colorPrimary: '#48A516',
                                            },
                                        }}
                                    >
                                    {/* Avatar */}
                                    <Form.Item
                                        name="avatar"
                                        initialValue={avatar}
                                        className='flex justify-center items-center'
                                    >
                                        <div className='w-full flex flex-col justify-center items-center'>
                                            {/* Rounded Image */}
                                            <Image
                                                src={avatar}
                                                alt="Avatar"
                                                width={200}
                                                height={200}
                                                className="rounded-full flex justify-center items-center"
                                            />
                                            <style jsx global>{`
                                                .ant-image-mask {
                                                    border-radius: 50%;
                                                }
                                            `}</style>
                                        </div>

                                        {/* Upload picture */}
                                        <div className='flex flex-col items-center justify-center'>
                                            <label className='font-sans'>
                                                <p>Change Profile Picture</p>
                                            </label>
                                            <input type="file" id="avatar" name="avatar" accept="image/*"  className='py-3 w-fit rounded-lg bg-green-2-600 justify-center items-center text-center px-3 text-neutral-100' onChange={handleProfileImageChange}/>
                                        </div>
                                    </Form.Item>
                        
                                    
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
                                        <Input disabled={false}/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        initialValue={name}
                                    >
                                        <Input disabled={false}/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        initialValue=""
                                    >
                                        <Input.Password disabled={true} placeholder="It's a Secret!"/>
                                        {/* Change password button */}
                                        <Button className='bg-green-2-500 rounded-full mb-5 font-bold mt-5 text-neutral-100 hover:!text-neutral-100 hover:bg-red-500 hover:border-red-600' onClick={() => setChangePasswordState(!changePasswordState)}>
                                            Change Password
                                        </Button>

                                        {/* New password form */}
                                        {changePasswordState ? (
                                            <div className='bg-neutral-100 p-10 rounded-lg'>
                                                <Form.Item
                                                    label="New Password"
                                                    name="newPassword"
                                                    initialValue=""
                                                    labelCol={{ span: 24 }}
                                                    wrapperCol={{ span: 24 }}
                                                    rules={[
                                                        { required: true, message: 'Please input your new password!' },
                                                        { min: 8, message: 'Password must be at least 8 characters!' },
                                                        { max: 20, message: 'Password must be less than 20 characters!' },
                                                    ]}
                                                >
                                                    <Input.Password disabled={false} onChange={(e) => setNewPassword(e.target.value)}/>
                                                </Form.Item>
                                                <Form.Item
                                                    label="Confirm New Password"
                                                    name="confirmNewPassword"
                                                    initialValue=""
                                                    labelCol={{ span: 24 }}
                                                    wrapperCol={{ span: 24 }}
                                                    rules={[
                                                        { required: true, message: 'Please input your new password!' },
                                                        { min: 8, message: 'Password must be at least 8 characters!' },
                                                        { max: 20, message: 'Password must be less than 20 characters!' },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue('newPassword') === value) {
                                                                    return Promise.resolve();
                                                                }
                                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input.Password disabled={false}/>
                                                </Form.Item>
                                                {/* Change password button */}
                                                <Button className='bg-red-600 
                                                                    rounded-full mb-5 
                                                                    font-bold mt-1 
                                                                    text-neutral-100 
                                                                    hover:!text-neutral-100 
                                                                    hover:bg-red-500 
                                                                    hover:border-red-600' 
                                                                    onClick={() => {
                                                                        handlePasswordChanged(newPassword);
                                                                    }}>
                                                    Confirm Change Password
                                                </Button>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </Form.Item>

                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        initialValue={email}
                                        rules={[
                                            { required: true, message: 'Please input your email!' },
                                            { validator: validateUgmEmail }
                                        ]}
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
                                        label="Github URL"
                                        name="githubURL"
                                        initialValue={github}
                                    >
                                        <Input disabled={false}/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Bio"
                                        name="bio"
                                        initialValue={bio}
                                        rules={[
                                            { max: 300, message: 'Bio must be less than 300 characters!' },
                                        ]}
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
                                        onClick={updateProfile}
                                    >
                                        Save
                                    </Button>


                                    </ConfigProvider>
                                </Form>
                        </div>
                    </div>
                </div>
            )}
        </FadeIn>
    )
}

export default Profile;