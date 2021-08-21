import { FC } from "react";
import { Modal, ModalProps } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Text from '../../styled/Text';
import Button from '../../styled/Button';
import Spacer from "../../styled/Spacer";
import StyledModal from "../../styled/StyledModal";

interface TellUsFormData {
    fullName: string;
    email: string;
    countryCode: string;
    mobile: string;
    concernedArea: string;
    requirement: string;
};

const tellUsFormSchema = yup.object().shape({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    countryCode: yup.string().required(),
    concernedArea: yup.string().required(),
    requirement: yup.string().required(),
    mobile: yup.string().matches(new RegExp('[0-9]{10}')).required()
});

const TellUsPopup:FC<ModalProps> = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<TellUsFormData>({
        resolver: yupResolver(tellUsFormSchema)
    });

    const onSubmit = (data: any) => {
        console.log(data);
        props.onHide();
    }

    return (
        <StyledModal { ...props }>
            <Modal.Body>
                <button className="close-icon" onClick={props.onHide}>
                    <img src="/icons/close.svg" width="22" alt="close"/>
                </button>
                <Text fontSize="xxl" fontFamily="montserrat">Tell us about your requirement</Text>
                <Spacer direction="vertical" size={12} />
                <div className="row">
                    <div className="col-15 col-md-8">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Text as="label" fontSize="sm" color="label">Your Name</Text>
                            <Spacer direction="vertical" size={3} />
                            <input {...register("fullName")} className="form-control" placeholder="Enter your Full name" />
                            {
                                errors.fullName && (<Text color="red" fontSize="xs">{errors.fullName?.message}</Text>)
                            }
                            <Spacer direction="vertical" size={15} />

                            <Text as="label" fontSize="sm" color="label">Email Address</Text>
                            <Spacer direction="vertical" size={3} />
                            <input {...register("email")} className="form-control" placeholder="Enter your Email Address" />
                            {
                                errors.email && (<Text color="red" fontSize="xs">{errors.email?.message}</Text>)
                            }
                            <Spacer direction="vertical" size={15} />

                            <Text as="label" fontSize="sm" color="label">Mobile No.</Text>
                            <Spacer direction="vertical" size={3} />
                            <div className="d-flex">
                                <select className="form-control" {...register("countryCode")}>
                                    <option>+91</option>
                                </select>
                                <Spacer size={15} direction="horizontal" />
                                <input {...register("mobile", { maxLength: 10 })} className="form-control" placeholder="Enter your Mobile No." />
                            </div>
                            {
                                errors.mobile && (<Text color="red" fontSize="xs">Invaild mobile number</Text>)
                            }
                            <Spacer direction="vertical" size={15} />

                            <Text as="label" fontSize="sm" color="label">Concerned Area</Text>
                            <Spacer direction="vertical" size={3} />

                            <select {...register("concernedArea")} className="custom-select-sm">
                                <option selected value="Divorce & Child Custody"> Divorce & Child Custody </option>
                                <option value="Family & Matrimonial"> Family & Matrimonial </option>
                                <option value="Property"> Property </option>
                                <option value="Will"> Will </option>
                                <option value="Criminal"> Criminal </option>
                                <option value="Consumer Protection"> Consumer Protection </option>
                                <option value="Cheque Bounce"> Cheque Bounce </option>
                                <option value="Cyber Crime"> Cyber Crime </option>
                                <option value="Labour & Employment"> Labour & Employment </option>
                                <option value="Legal Notice"> Legal Notice </option>
                                <option value="Other Legal Problem"> Other Legal Problem </option>
                            </select>

                            <Spacer direction="vertical" size={15} />

                            <Text as="label" fontSize="sm" color="label">Let us know your requirement</Text>
                            <Spacer direction="vertical" size={3} />
                            <textarea {...register("requirement")} className="form-control" placeholder="Describe your requirement" />
                            {
                                errors.requirement && (<Text color="red" fontSize="xs">{errors.requirement?.message}</Text>)
                            }
                            <Spacer direction="vertical" size={15} />

                            <Button size="md" rounded>Submit your requirement</Button>
                        </form>
                    </div>
                </div>
            </Modal.Body>
        </StyledModal>
    );
};

export default TellUsPopup;