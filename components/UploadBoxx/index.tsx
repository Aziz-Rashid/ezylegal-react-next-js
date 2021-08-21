import { FC, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import Text from "../../styled/Text";
import Spacer from "../../styled/Spacer";
import Button from "../../styled/Button";
import { DropzoneBox, FileName } from "./UploadBox.styled";
import {Get_Signed_URL,Uploard_Document_Url} from '../../constants/queries/order'
import backendApi from '../../api/backendApi';

interface UploadBoxProps {
  files: Array<any>;
  setFiles: Function;
  orderid: String
}


const UploadBox: FC<UploadBoxProps> = ({ setFiles, files,orderid }) => {
  const addFiles = (newFiles: Array<any>) => {
    setFiles([...files, ...newFiles.map(file => ({ inputName: '', file }))]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const onDrop = useCallback((acceptedFiles) => {
    addFiles(acceptedFiles);
  }, [files]);

  const onInputChange = (index: number, e: any) => {
    setFiles(files.map((item, i) => i === index ? { ...item, inputName: e.target.value } : item));
  };
  
  const UploadData = async (id:any) => {
    const requirmentinfoUrl = await backendApi.post('/', {
      query: Get_Signed_URL,
      variables: {
        docType: files[id].file.path
      }
    });
    console.log()
    if(!requirmentinfoUrl.data.data.getSignedUrl.url){
      return console.log("Error")
    }
    const UploadUrl = await backendApi.post('/', {
      query: Uploard_Document_Url,
      variables: {
        _id: orderid,
        document_name: files[id].inputName,
        document_url: requirmentinfoUrl.data.data.getSignedUrl.url
      }
    });
    console.log(UploadUrl)
  }
  console.log(files)

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <>
      <Text fontSize="xxl" fontFamily="montserrat">
        Upload Files
      </Text>
      <Spacer direction="vertical" size={12} />
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <DropzoneBox>
          <Text fontSize="sm" center>
            Drop the files here
          </Text>
        </DropzoneBox>
      </div>
      <Spacer direction="vertical" size={20} />
      {files.map((item, i) => (
        <div key={i} className="row m-0 align-items-center">
          <div className="col-5 p-0">
            <input className="form-control" placeholder="File Name" value={item.inputName} onChange={(e) => onInputChange(i, e)} />
          </div>
          <div className="col-3 p-0">
            <FileName>
              {/* <img src="/icons/attachment_24px.svg" alt="attachment" width="20"/> */}
              { item?.file.name }
            </FileName>
          </div>
          <div className="col-2 p-0" >
            <Button size="xs" className="p-1" onClick={() => removeFile(i)} backgroundColor="white">
              <img src="/icons/delete_24px.svg" alt="Delete" width="22" />
            </Button>
          </div>
          <div className="col-2 p-0" >
          <Button size="xs" className="p-1" onClick={() => UploadData(i)} backgroundColor="white">
              <img src="/icons/Upload-Documents.svg" alt="Delete" width="22" />
            </Button>
            
          </div>
         
        </div>
      ))}
      <Spacer direction="vertical" size={10} />
    </>
  );
};

export default UploadBox;
