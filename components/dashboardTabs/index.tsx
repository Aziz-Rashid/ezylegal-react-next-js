import React, { FC, useState, useEffect } from "react";
import { Subtabcontent } from "../../styled/StyledTabs";
import { Container, Row, Col, Tabs, Tab, Nav, Badge } from "react-bootstrap";
import Text from "../../styled/Text";
import UploadBox from '../UploadBoxx';
import Button from "../../styled/Button";
import Link from "next/link";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import CheckBox from "../CheckBox";
import { LoginModal, ModalBody } from './DashboardPopup.styled';
import { useDispatch, useSelector } from "react-redux";
import { Get_Time_Slot } from '../../redux/cart/cart.actions'
import StarRatingComponent from 'react-star-rating-component';
const customspan: any = {
    display: "inline-flex",
    fontSize: "14px",
    fontWeight: "normal",
};
let today = new Date();
const DashboardTabs: FC<any> = ({ loginuser, purchasedata, currentorder }) => {
    const [files, setFiles] = useState<Array<any>>([]);
    const [checkboxid, setCheckboxId] = useState('')
    const dispatch = useDispatch();
    const [togle, setTogle] = useState<Boolean>(false)
    const [isOpen, setisOpen] = useState<Boolean>(false)
    const [timeSlot, setTimeslote] = useState([])
    const [dates, setDates] = useState('')
    const [todaytime, setTodayTime] = useState<any>('')
    const [rating, setRating] = useState<number>(0)
    const [timeSlotdata, setTimeslotedata] = useState()
    var todayDate = dates !== "" ? new Date(dates).toISOString().slice(0, 10) : "";
    const handleClose = () => {
        setisOpen(false)
    }
    useEffect(() => {
        if (todaytime !== '') {
            dispatch(Get_Time_Slot(todaytime, setTimeslote))
        }
    }, [todaytime])

    const onStarClick = (nextValue: number) => {
        setRating(nextValue);
    }


    return (
        <>
            <Subtabcontent>
                <Row>
                    {purchasedata ? purchasedata?.map((data: any, i: number) => (
                        <Col md={6}>
                            <div className="align_cont">
                                <Text fontSize="md" color="black">
                                    Order Id:
                                      <span style={customspan}>{data._id}</span>
                                </Text>
                                {/* <a href="#">
                                    <img
                                        src="/icons/download_icon.svg"
                                        alt="Continue"
                                        width="25"
                                    />
                                      &nbsp; Download
                                    </a> */}
                            </div>
                            <div className="othercont">
                                <Text fontSize="sm" color="black">
                                    Purchsaed on: {new Date(data.created_at).toLocaleDateString()}, {data.products.length} Product
                                        purchased
                                    </Text>
                                <Text fontSize="xs" color="black">
                                    Case Assigned to
                                </Text>
                                <Text fontSize="md" color="black">
                                    {data.assigned_user == null && "Null"}
                                </Text>
                            </div>
                        </Col>
                    )) : null}
                    {purchasedata && (
                        <Col md={6}>
                            <div className="dottedbox">
                                <div className="align_cont">
                                    <div className="row">
                                        <div className="col-12 col-md-12">
                                            <UploadBox orderid={currentorder?.data?.createOrder?._id} setFiles={setFiles} files={files} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Text onClick={() => setTogle(!togle)} color="primary" style={{ textAlign: 'right', cursor: 'pointer' }}>{purchasedata && purchasedata?.map((el: any) => <span key={el._id}>{el.required_documents.length}</span>)} Document Uploaded by you</Text>
                            {togle && (
                                <div className="dottedbox" style={{ textAlign: 'left' }}>
                                    <Text color="primary"><img src="/icons/download_icon.svg" alt="download-icon" />Download</Text>
                                    {purchasedata && purchasedata.map((el: any, index: number) => (
                                        <span key={index}>
                                            { el.required_documents.map((docs: any, i: number) => (
                                                <>
                                                    <CheckBox name="Name Approvassssl Certificate" checked={checkboxid == docs._id ? true : false}>
                                                        <Text inline onClick={() => {
                                                            setCheckboxId('')
                                                            setCheckboxId(docs._id)
                                                        }}>
                                                            {docs.document_name}{"-"} <Text inline color="red">{`(${docs.document_status})`}</Text>
                                                        </Text>
                                                    </CheckBox>
                                                    <br />
                                                </>
                                            ))}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </Col>
                    )}
                </Row>
                {purchasedata && (
                    <Row className="white_bg">
                        <Col md={12}>
                            {/* <div className="compny_det">
                                {purchasedata && purchasedata.map((data: any, i: number) => (
                                    <span key={i * 52}>
                                        { data.products.map((el: any, ind: number) => (
                                            ind == 0 && (
                                                <Text fontSize="xs" key={i * 555}>
                                                    {el.deliverables.length} {" "} Documents uploaded by lowyer
                                                    <Badge variant="danger">{el.deliverables.length} {" "}</Badge>
                                                </Text>
                                            )
                                        ))}
                                    </span>
                                ))}

                            </div> */}
                            {purchasedata && purchasedata.map((data: any, i: number) => (
                                <span key={i * 25}>
                                    {data.products.map((el: any, index: number) => (
                                        <div className="compny_det" key={index * 2000}>
                                            <Text fontSize="md" color="black" weight="bold">
                                                {el.product_name}<span style={{ background: 'lightgray', color: 'white', padding: '5px', marginLeft: '20px', borderRadius: '5px' }}>{el.status}</span>
                                            </Text>

                                            {el.deliverables.map((deleiverab: any) => (
                                                <span key={index * 225}>
                                                    <Text fontSize="md" color="black">
                                                        {deleiverab.deliverable_name}
                                                    </Text>
                                                    <Text color="black" style={{ color: 'black' }}>
                                                        {deleiverab.deliverable_status}
                                                    </Text>
                                                </span>
                                            ))}
                                        </div>
                                    ))}
                                </span>
                            ))}
                        </Col>
                        <Col md={12}>
                            <Link href="#">
                                <Button
                                    size="lg"
                                    as="a"
                                    rounded
                                    className="arrow_btn mr-2"
                                >
                                    <img
                                        src="/icons/mail_icon.svg"
                                        alt="send message"
                                        width="20"
                                    />
                                      Send Message
                                    </Button>
                            </Link>
                            <Button size="lg" onClick={() => setisOpen(true)} as="a" rounded className="arrow_btn">
                                <img
                                    src="/icons/call_icon.svg"
                                    alt="call"
                                    width="20"
                                />
                                      Call
                             </Button>
                            {purchasedata.map((el:any) => (
                                el.products.map((data:any) => (
                                        data.status == "Completed" ? (
                                            <div style={{ display: 'flex', alignItems: 'center' }} key={el._id}>
                                                <Button
                                                    size="lg"
                                                    as="a"
                                                    rounded
                                                    className="arrow_btn mr-4"
                                                >
                                                    Confirm Closure
                                            </Button>
                                                <span>
                                                    <Text fontSize="md" color="black" inline>
                                                        Rate your Experience<br />
                                            to Give Feedback
                                        </Text>
                                                    <span className="ml-4" style={{ fontSize: '30px' }}>
                                                        <StarRatingComponent
                                                            name="rate1"
                                                            starCount={5}
                                                            value={rating}
                                                            starColor="#17a2b8"
                                                            emptyStarColor="gray"
                                                            onStarClick={onStarClick}
                                                            onStarHoverOut={onStarClick}
                                                        />
                                                    </span>
                                                </span>
                                            </div>

                                        ) : null
                                ))
                            ))}
                            {isOpen && (
                                <LoginModal show={true} onHide={handleClose} centered size="xl">
                                    <ModalBody>
                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <Text color="black" fontSize="xxl" weight="bold">
                                                    Schedule a Call
                                         </Text>
                                                <DayPickerInput
                                                    classNames={{ container: "DayPickerInput d-block", overlayWrapper: "DayPickerInput-OverlayWrapper", overlay: "DayPickerInput-Overlay" }}
                                                    component={(props: any) => <input {...props} value={todayDate} placeholder="YYYY-MM-DD" className="form-control" />}
                                                    dayPickerProps={{ disabledDays: { before: today } }}
                                                    format="YYYY-MM-DD"
                                                    onDayChange={(day: any) => {
                                                        setDates(day)
                                                        setTodayTime(new Date(day).toLocaleString())
                                                    }}
                                                />
                                                <div className="mt-4" style={{ display: 'flex',flexWrap:'wrap' }}>
                                                    {todaytime !== "" && timeSlot.map((el: any, i: number) => {
                                                        return (
                                                            <span key={i} style={{ color: timeSlotdata == el ? "white" : 'black', background: timeSlotdata == el ? "#9ea3dc" : 'hsl(0deg 0% 91%)', padding: '10px', borderRadius: '25px', margin: "7px 5px", marginRight: '5px', marginBottom: '7px', cursor: 'pointer' }} onClick={() => setTimeslotedata(el)}>{new Date(el * 1000).toLocaleTimeString()}</span>
                                                        )
                                                    })}
                                                </div>
                                                <Col md={12} className="mt-5">
                                                    <Link href="#">
                                                        <Button
                                                            size="lg"
                                                            as="a"
                                                            rounded
                                                            className="arrow_btn mr-2"
                                                        >
                                                            Schedule a Call
                                                        </Button>
                                                    </Link>
                                                </Col>
                                            </div>
                                        </div>
                                    </ModalBody>
                                </LoginModal>
                            )}
                        </Col>
                    </Row>
                )}
            </Subtabcontent>
        </>
    );
};

export default DashboardTabs;