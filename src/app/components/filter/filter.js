import { use, useEffect, useState } from "react";
import { ConfigProvider, Select, Space } from "antd";
import Posts from '../posts/posts';
// import { useHistory } from 'react-router-dom';

export default function Filter({ documents, filterDocuments }){
    const [selectedMajor, setSelectedMajor] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    // const history = useHistory();
    
    // const FilterMethod = () => {
    //     // let filteredDocuments;
    
    //     if (selectedMajor) {
    //     return documents.filter(
    //         (doc) => doc.doc_major === selectedMajor
    //     );
    //     }
    
    //     if (selectedYear) {
    //     return documents.filter(
    //         (doc) => doc.doc_year === selectedYear
    //     );
    //     }
    //     // handleFilteredDocuments(filteredDocuments);
    //     // return filteredDocuments
    // }

    const FilterMethod = () => {
        let filteredDocuments = documents;
    
        if (selectedMajor) {
          filteredDocuments = documents.filter((doc) => doc.doc_major === selectedMajor);
        }
    
        if (selectedYear) {
          filteredDocuments = documents.filter((doc) => doc.doc_year === selectedYear);
        }
    
        return filteredDocuments;
      };

    // const filteredDocuments = FilterMethod();
    // console.log(filteredDocuments);

    useEffect(() => {
        // filterDocuments(FilterMethod());
        // const docs = FilterMethod();
        const filteredResult = FilterMethod();
        filterDocuments(filteredResult);
        console.log("Welcome to my life: ", filteredResult);
        // history.push('../../dashboard', { filteredDocuments: docs });
    }, [selectedMajor, selectedYear]);

    // const handleFilteredDocuments = (documents) => {
    //     filterDocuments(documents);
    //     console.log("Welcome to my life: ", documents);
    // }

    

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
                            
                            onChange={(value) => {
                                setSelectedMajor(value);
                                // const filteredDocuments = FilterMethod();
                                // handleFilteredDocuments(filteredDocuments);
                            }}
                            
                            options={[
                                {value: "tif", label: 'Teknologi Informasi'},
                                {value: "te", label: 'Teknik Elektro'},
                                {value: "tb", label: 'Teknik Biomedis'},
                            ]}
                            allowClear
                        />
                    </Space>
                </div>
                <div className="flex flex-row space-x-[8px] ">
                    <p className="font-medium">Tahun :</p>
                    <Space wrap>
                        <Select
                            placeholder="2023"
                            style={{ width: 296, borderColor: '#48A516' }}
                            
                            onChange={(value) => {
                                setSelectedYear(value);
                                // const filteredDocuments = FilterMethod();   
                                // handleFilteredDocuments(filteredDocuments);
                            }}
                            options={[
                                {value: 2023, label: '2023'},
                                {value: 2022, label: '2022'},
                                {value: 2021, label: '2021'},
                            ]}
                            allowClear
                        />
                    </Space>
                </div>
            </div>
        </ConfigProvider>
    )
}
