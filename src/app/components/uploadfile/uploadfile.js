'use client;'

import { ConfigProvider, Form, Input, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;
import Button from '../button/button';
import axios from 'axios';
import { on } from 'events';
import { use, useState } from 'react';


export default function UploadFile({ onClose }) {
    const [fileList, setFileList] = useState([]);
    const closeModal = () => {
        onClose();
    }

    const { TextArea } = Input;

    // const beforeUpload = (file) => {
    //     const maxSizeInBytes = 10 * 1024 * 1024; // Set the maximum file size (10MB in this case)
    //     if (file.size > maxSizeInBytes) {
    //         message.error(`${file.name} is too large, please upload a file smaller than 10MB.`);
    //         return false; // Returning false will prevent the upload
    //     }
    //     return true; // Allow the upload
    // };

    const onFinish = async (values) => {
        // Handle form submission here
        // console.log('Received values:', values);
        // You can perform any additional logic or API calls upon form submission


        // try {
        //     const response = await axios.post(process.env.TEST_NEXT_PUBLIC_API_URL + '/documents', values);

        //     if (response.status === 200) {
        //         const data = response.data;
        //         message.success('Data uploaded.');
        //         console.log('Data uploaded:', data);
        //         onClose();
        //     // Perform any additional actions based on the response
        //     } else {
        //         // Handle error scenarios
        //         message.error('Failed to upload data!');
        //         console.error('Failed to upload data!');
        //     }
        // } catch (error) {
        //     // Handle error scenarios
        //     message.error('Error occurred while uploading data!');
        //     console.error('Error occurred while uploading data:', error);
        // }
        try {
            const formData = new FormData();
            formData.append('doc_link', fileList[0]); // Assuming only one file is uploaded
            formData.append('doc_major', values.doc_major);
            formData.append('doc_year', values.doc_year);
            formData.append('doc_title', values.doc_title);
            formData.append('doc_description', values.doc_description);
            const response = await axios.post('https://plain-toad-sweater.cyclic.app'+ '/documents', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                const data = response.data;
                message.success('Data uploaded.');
                console.log('Data uploaded:', data);
                onClose();
            } else {
                message.error('Failed to upload data!');
                console.error('Failed to upload data!');
            }

        } catch (error) {
            message.error('Error occurred while uploading data!');
            console.error('Error occurred while uploading data:', error);
        }

    };

    // const props = {
    //     name: 'file',
    //     multiple: false,
    //     // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    //     beforeUpload: beforeUpload,
    //     onChange(info) {
    //         const { status } = info.file;
    //         if (status !== 'uploading') {
    //             console.log(info.file, info.fileList);
    //         }
    //         if (status === 'done') {
    //             message.success(`${info.file.name} file uploaded successfully.`);
    //         } else if (status === 'error') {
    //             message.error(`${info.file.name} file upload failed.`);
    //         }
    //     },
    //     onDrop(e) {
    //         console.log('Dropped files', e.dataTransfer.files);
    //     },
    // };
    // const props = {
    //     name: 'file',
    //     multiple: false,
    //     fileList,
    //     beforeUpload,
    //     onChange(info) {
    //         const { status, fileList: newFileList } = info;
    //         setFileList(newFileList.slice(-1)); // Limit file list to one file

    //         if (status === 'done') {
    //             message.success(`${info.file.name} file uploaded successfully.`);
    //         } else if (status === 'error') {
    //             message.error(`${info.file.name} file upload failed.`);
    //         }
    //     }
    // };
    const props = {
        name: 'file',
        multiple: false,
        accept: '.pdf',
        // action : 'https://http://localhost:3000/testing-component/content',
        beforeUpload: (file) => {
            // Perform any pre-upload actions here, such as storing the file
            // You can store the file in state or perform any necessary processing
            const maxSizeInBytes = 10 * 1024 * 1024; // Set the maximum file size (10MB in this case)
            if (file.size > maxSizeInBytes) {
                message.error(`${file.name} is too large, please upload a file smaller than 10MB.`);
                return false; // Returning false will prevent the upload
            }else{
            // Example: Storing the file in state
            setFileList([file]); // Assuming fileList is a state variable
            }
            return false;
            // Prevent actual upload for now

        },
        onChange: (info) => {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                // Perform any additional logic after successful upload
                // For MongoDB upload, use the stored file from the state (fileList)
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop: (e) => {
            console.log('Dropped files', e.dataTransfer.files);
            // Perform any actions when files are dropped
        },
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 " >
            <div className="bg-white p-10 rounded-lg">
                <div>
                    <div>
                        <h1 className="text-[30px] font-bold text-neutral-900 pb-[8px] ">Unggah Dokumen Anda!</h1>
                        <p className="text-[14px] font-medium text-neutral-500 ">Description</p>
                    </div>
                    <div>
                        <ConfigProvider
                            theme={{
                                token: {
                                    // Seed Token
                                    colorPrimary: '#48A516',
                                },
                            }}
                        >
                            <Form
                                name='document'
                                style={{ maxWidth: 449 }}
                                layout='vertical'
                                autoComplete='off'
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label='Program Studi'
                                    name='doc_major'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select a Program Studi',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="e.g. Teknologi Informasi"
                                        style={{ borderColor: '#48A516' }}

                                        // onChange={{/*onChange*/}}
                                        options={[
                                            { value: null, label: null },
                                            { value: 'tif', label: 'Teknologi Informasi' },
                                            { value: 'te', label: 'Teknik Elektro' },
                                            { value: 'tb', label: 'Teknik Biomedis' },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Tahun'
                                    name='doc_year'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input the Tahun',
                                        },
                                    ]}
                                >
                                    <Input placeholder='e.g. 2023' type='number' />

                                </Form.Item>
                                <Form.Item
                                    label='Judul'
                                    name='doc_title'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input the Judul',
                                        },
                                    ]}
                                >
                                    <Input placeholder='e.g. Soal Latihan Aljabar Linear' type='text' />

                                </Form.Item>
                                <Form.Item
                                    label='Deskripsi'
                                    name='doc_description'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input the Deskripsi',
                                        },
                                    ]}
                                >
                                    <TextArea placeholder='Materi tentang ...' autoSize={{ minRows: 3, maxRows: 6 }} />
                                </Form.Item>
                                <Form.Item
                                    name='doc_link'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please upload a file',
                                            validator: (_, value) => {
                                                if (!value || value.fileList.length === 0) {
                                                    return Promise.reject(new Error('Please upload a file'));
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <Dragger {...props}>
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p className="ant-upload-hint">
                                            Support for only single upload up to 10MB file. Strictly prohibited from uploading company data or other
                                            banned files.
                                        </p>
                                    </Dragger>
                                </Form.Item>
                                <Form.Item>
                                    <div className='flex flex-row pt-[24px] space-x-[12px] '>
                                        <Button
                                            htmlType='submit'
                                            text='Unggah'
                                            className="hover:bg-green-2-600 "
                                        />
                                        <Button
                                            text='Batal'
                                            className='group border-[1px] border-green-2-500 hover:border-green-1-500 '
                                            color='bg-transparent'
                                            textColor='text-green-2-500 group-hover:text-green-1-500'
                                            onClick={closeModal}
                                        />
                                    </div>
                                </Form.Item>
                            </Form>
                        </ConfigProvider>
                    </div>
                </div>
                {/* <div>

                </div> */}
            </div>
        </div>
    )
}