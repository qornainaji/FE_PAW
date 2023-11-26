
import { ConfigProvider, Form, Input, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;
import Button from '../button/button';


export default function UploadFile({ onClose}) {
    const closeModal = () => {
        onClose();
    }
    
    const { TextArea } = Input;

    const beforeUpload = (file) => {
        const maxSizeInBytes = 10 * 1024 * 1024; // Set the maximum file size (10MB in this case)
        if (file.size > maxSizeInBytes) {
            message.error(`${file.name} is too large, please upload a file smaller than 10MB.`);
            return false; // Returning false will prevent the upload
        }
        return true; // Allow the upload
    };

    const onFinish = (values) => {
        // Handle form submission here
        console.log('Received values:', values);
        // You can perform any additional logic or API calls upon form submission
    };

    const props = {
        name: 'file',
        multiple: false,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        beforeUpload: beforeUpload,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
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
                                name='uploadfile'
                                style={{ maxWidth: 449 }}
                                layout='vertical'
                                autoComplete='off'
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label='Program Studi'
                                    name='programstudi'
                                >
                                    <Select
                                        placeholder="e.g. Teknologi Informasi"
                                        style={{borderColor: '#48A516' }}

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
                                    name='tahun'
                                >
                                    <Input placeholder='e.g. 2023' type='number' />

                                </Form.Item>
                                <Form.Item
                                    label='Judul'
                                    name='judul'
                                >
                                    <Input placeholder='e.g. Soal Latihan Aljabar Linear' type='text' />

                                </Form.Item>
                                <Form.Item
                                    label='Deskripsi'
                                    name='deskripsi'
                                >
                                    <TextArea placeholder='Materi tentang ...' autoSize={{ minRows: 3, maxRows: 6 }} />
                                </Form.Item>
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