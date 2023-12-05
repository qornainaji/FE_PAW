
import { ConfigProvider, Select, Space } from "antd";


export default function Filter(){
    return(
        <ConfigProvider 
        theme={{
            token: {
              // Seed Token
              colorPrimary: '#48A516',
            },
          }}
        >
            <div className="flex flex-row pb-[24px] w-full space-x-[20px] text-neutral-900 mb-[24px] mt-[24px]">
                <div className="flex flex-row space-x-[8px] ">
                    <p className="font-medium">Program Studi :</p>
                    <Space wrap>
                        <Select
                            placeholder="e.g. Teknologi Informasi"
                            style={{ width: 296, borderColor: '#48A516' }}
                            
                            // onChange={{/*onChange*/}}
                            options={[
                                {value: null, label: null},
                                {value: 'tif', label: 'Teknologi Informasi'},
                                {value: 'te', label: 'Teknik Elektro'},
                                {value: 'tb', label: 'Teknik Biomedis'},
                            ]}
                        />
                    </Space>
                </div>
                <div className="flex flex-row space-x-[8px] ">
                    <p className="font-medium">Program Studi :</p>
                    <Space wrap>
                        <Select
                            placeholder="2023"
                            style={{ width: 296, borderColor: '#48A516' }}
                            
                            // onChange={{/*onChange*/}}
                            options={[
                                {value: 2023, label: '2023'},
                                {value: 2022, label: '2022'},
                                {value: 2021, label: '2021'},
                            ]}
                        />
                    </Space>
                </div>
            </div>
        </ConfigProvider>
    )
}