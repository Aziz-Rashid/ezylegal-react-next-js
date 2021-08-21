import DayPickerInput from 'react-day-picker/DayPickerInput';
import Text from "../../styled/Text";
import Spacer from "../../styled/Spacer";
import Button from "../../styled/Button";
import { useState,useEffect } from 'react';
import UploadBox from '../UploadBox';
import { useRouter } from "next/router";
import { RootState } from "../../redux/store";
import { Get_Signed_Url,Get_Time_Slot,Upload_docs_Url } from '../../redux/cart/cart.actions'
import { useDispatch,useSelector } from "react-redux";


let today = new Date();

const Step2 = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState<Array<any>>([]);
  const [url, setUrl] = useState<Array<any>>([]);
  const [todaytime,setTodayTime] = useState<any>('')
  const [timeSlot,setTimeslote] = useState([])
  const [timeSlotdata,setTimeslotedata] = useState()
  const [requrmentInfo,setrequiremntInfo] = useState<string>('')
  const orderData = useSelector((store: RootState) => store.currentOrders);
  const loggedInUserData = useSelector((store: RootState) => store.loggedInUser);
  const [dates,setDates] = useState('')
  const router = useRouter()
  const newurl = url.map(ur => {
    let newur = ur.split('?')
    return newur[0]
  })
  var todayDate = dates !== "" ? new Date(dates).toISOString().slice(0, 10) : "";
  const CallbackData = {
    assignedUser: loggedInUserData._id,
    time_slot: timeSlotdata,
    _id: orderData.data.createOrder._id
  }
  useEffect(() => {
    files.map(el => {
      dispatch(Get_Signed_Url(el.file.path,setUrl,url,() => {
        console.log("Routing")
      }));
    })
  },[files.length])

  useEffect(() => {
    if(todaytime !== ''){
      dispatch(Get_Time_Slot(todaytime,setTimeslote))
    }
  },[dates])
  const newdata = newurl.map((el,i) => {
    return {
      document_url:newurl[i],
      document_name: files[i]?.inputName,
      _id:orderData.data.createOrder._id
    }
})

  const submitForm = () => {
      dispatch(Upload_docs_Url(newdata,CallbackData,requrmentInfo,() => {
        router.push('/dashboard')
      }))
  }
 
  useEffect(() => {
    setTodayTime('')
  },[])
  return (
    <>
      <Text fontSize="xxxl" fontFamily="montserrat">
        Tell us about your requirement
      </Text>
      <Spacer direction="vertical" size={25} />
      <div className="row">
        <div className="col-12 col-md-6">
          <Text color="label" fontSize="lg">
            Describe your requirement
          </Text>
          <textarea value={requrmentInfo} onChange={(e) => setrequiremntInfo(e.target.value)} required className="form-control" placeholder="Describe your requirement" />
          <Spacer direction="vertical" size={20} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <UploadBox setFiles={setFiles} files={files} />
          <Spacer direction="vertical" size={20} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <Text color="label" fontSize="lg">
            Schedule call with an expert
          </Text>
          <DayPickerInput 
            classNames={{ container: "DayPickerInput d-block",  overlayWrapper: "DayPickerInput-OverlayWrapper", overlay: "DayPickerInput-Overlay" }}
            component={(props: any) => <input {...props } value={todayDate} placeholder="YYYY-MM-DD" className="form-control"/>}
            dayPickerProps={{ disabledDays: { before: today } }}
            format="YYYY-MM-DD"
            onDayChange={(day: any) => {
              setDates(day)
              setTodayTime(new Date(day).toLocaleString())
            }}
          />
          <div className="mt-4" style={{display:'flex',flexWrap:"wrap"}}>
            {todaytime !== ""  && timeSlot.map((el:any,i:number) =>{
              return(
                <span key={i} style={{color: timeSlotdata == el ? "white" :'black' ,background: timeSlotdata == el ? "#9ea3dc" :'hsl(0deg 0% 91%)',padding:'10px',borderRadius:'25px',margin:"7px 5px",marginRight:'5px',marginBottom:'7px',cursor:'pointer'}} onClick={() => setTimeslotedata(el)}>{new Date(el * 1000).toLocaleTimeString()}</span>
              )
            })}
          </div>
          <Spacer direction="vertical" size={20} />
        </div>
      </div>
      <Spacer direction="vertical" size={20} />
      <Button size="md" rounded onClick={() => submitForm()}>
        Submit your requirement
      </Button>
      </>
  );
};

export default Step2;

