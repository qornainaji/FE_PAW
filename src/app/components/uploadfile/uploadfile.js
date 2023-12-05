'use client;'
require('dotenv').config();
import { ConfigProvider, Form, Input, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;
import Button from '../button/button';
import axios from 'axios';
import { on } from 'events';
import { use, useState, useEffect, useRef } from 'react';


export default function UploadFile({ onClose }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [pdfPreview, setPdfPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const modalContainerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalContainerRef.current && !modalContainerRef.current.contains(event.target)) {
                onClose();
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [modalContainerRef]);

    const onFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPdfPreview(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
            // setSelectedFile(file);
        }
    }

    const closeModal = () => {
        onClose();
    }

    const { TextArea } = Input;

    const onFinish = async (values) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('doc_title', values.doc_title);
        formData.append('doc_year', values.doc_year);
        formData.append('doc_major', values.doc_major);
        formData.append('doc_description', values.doc_description);
        formData.append('doc_view', 0);
        // get current date
        const currentDate = new Date();
        formData.append('doc_date_upload', currentDate);
        formData.append('doc_download', 0);
        formData.append('doc_file', selectedFile); // Assuming only one file is uploaded
        for (const pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]); // Logging key-value pairs
        }
        try {
            // const response = await axios.post('https://plain-toad-sweater.cyclic.app'+'/documents/', formData, {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'documents/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                message.success('Data uploaded successfully.');
                closeModal();
                // Handle success response if needed
            } else {
                message.error('Failed to upload data.');
                // Handle error scenarios
            }

        } catch (error) {
            message.error('Error occurred while uploading data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };


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
            } else {
                // Example: Storing the file in state
                setSelectedFile(file); // Assuming fileList is a state variable
            }
            return false;
            // Prevent actual upload for now

        },
        onChange: (info) => {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.selectedFile);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                // const fileData = info.file.originFileObj;
                // setSelectedFile(fileData);
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
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50" >
            <div ref={modalContainerRef} className="bg-white p-10 mt-10 rounded-lg flex flex-row-reverse h-3/4 overflow-auto">
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
                                className='space-y-[8px]'
                            // enctype="multipart/form-data"
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
                                        options={[
                                            { value: 'tif', label: 'Teknologi Informasi' },
                                            { value: 'te', label: 'Teknik Elektro' },
                                            { value: 'tb', label: 'Teknik Biomedis' },
                                        ]}
                                        allowClear
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
                                    name='doc_file'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please upload a file',
                                        },
                                    ]}
                                    onChange={onFileChange}
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
                                    <div className='flex flex-row pt-[24px] space-x-[12px] mb-10'>
                                        <Button
                                            htmlType='submit'
                                            text='Unggah'
                                            className="hover:bg-green-2-600"
                                            loading={loading}
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
                {pdfPreview && (
                    <div className='mr-10'>

                        <div>
                            {/* <h3>Preview:</h3> */}
                            <embed src={pdfPreview} type="application/pdf" width="100%" height="400px" className='rounded-[12px]' />
                        </div>
                        {/* // <object data={`${pdfPreview}#page=1`} type="application/pdf" width="100%" height="600px">
                        // </object> */}
                    </div>
                )}
            </div>
        </div>
    )
}