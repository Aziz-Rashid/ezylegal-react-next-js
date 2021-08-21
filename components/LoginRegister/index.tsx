import React, { useState } from 'react'

import Text from "../../styled/Text";
import FormInput from '../Form/Input';
import { Box, Heading, Tab, Button } from './LoginRegister.styled';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactSelect from "../ReactSelect";
import backendApi from "../../api/backendApi";
import Spacer from "../../styled/Spacer";
import SubmitButton from "../../styled/Button";
import { LOGIN_QUERY } from "../../constants/queries/user";
import { errorToast } from "../../utils/toasts";
import countryCode from "../../constants/countryCode";


const loginSchema = yup.object().shape({
    countryCode: yup.string().required(),
    mobile: yup.string().matches(new RegExp("[0-9]{10}")).required(),
});

const RegisterSchema = yup.object().shape({
    countryCode: yup.string().required(),
    mobile: yup.string().matches(new RegExp("[0-9]{10}")).required(),
    email: yup.string().email().required(),
    name: yup.string().required(),
});

const Login = () => {
    const [loginData, setLoginData] = useState<any>(null);
    const { register, handleSubmit, control, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            countryCode: "91",
            mobile: ""
        },
    });

    const onSubmit = (data: any) => {
        
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Text fontSize="lg" color="gray">
                Login by Mobile No.
            </Text>
            <Spacer direction="vertical" size={15} />
            <div className="d-flex" style={{justifyContent:'center'}}>
                <div style={{width:'20%'}}>
                    <Controller
                        control={control}
                        name="countryCode"
                        render={({ field: { value, onChange, onBlur, ...field } }) => (
                            <ReactSelect
                                getOptionValue={(option: any) => option.value}
                                options={countryCode}
                                placeholder=""
                                onBlur={onBlur}
                                value={countryCode.find((code) => code.value === value)}
                                onChange={(value: any) => {
                                    onChange(value.value);
                                }}
                                {...field}
                            />
                        )}
                    />
                </div>
                <Spacer direction="horizontal" size={10} />
                <div style={{width:'70%'}}>
                    <input
                        className="form-control"
                        placeholder="Enter valid mobile no."
                        {...register("mobile")}
                    />
                </div>
            </div>
            {errors.mobile && (
                <Text color="red" fontSize="xs">
                    Invaild mobile number
                </Text>
            )}
            <Spacer direction="vertical" size={30} />
            <SubmitButton size="md" rounded block>Login</SubmitButton>
        </form>
        )
};


const Register = () => {
    const [registerData, setRegisterData] = useState<any>(null);
    const { register, handleSubmit, control, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues: {
            countryCode: "91",
            mobile: "",
            email:"",
            name:""
        },
    });

    const onSubmit = (data: any) => {
        backendApi
            .post("/", {
                query: LOGIN_QUERY,
                variables: {
                    mobile: parseFloat(data.mobile),
                    countryCode: parseInt(data.countryCode),
                },
            })
            .then((res) => {
                if (res.data.data) {
                    setRegisterData(getValues());
                } else if (res.data.errors.length) {
                    throw new Error(res.data.errors[0].message);
                }
            })
            .catch((error) => {
                errorToast(error.message);
            });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Text fontSize="lg" color="gray">
                Lawyer Registration.
            </Text>
            <Spacer direction="vertical" size={15} />
            <div className="d-flex" style={{justifyContent:'center'}}>
                <div style={{width:'20%'}}>
                    <Controller
                        control={control}
                        name="countryCode"
                        render={({ field: { value, onChange, onBlur, ...field } }) => (
                            <ReactSelect
                                getOptionValue={(option: any) => option.value}
                                options={countryCode}
                                placeholder=""
                                onBlur={onBlur}
                                value={countryCode.find((code) => code.value === value)}
                                onChange={(value: any) => {
                                    onChange(value.value);
                                }}
                                {...field}
                            />
                        )}
                    />
                </div>
                <Spacer direction="horizontal" size={10} />
                <div style={{width:'80%'}}>
                    <input
                        className="form-control"
                        placeholder="Enter valid mobile no."
                        {...register("mobile")}
                    />
                </div>
            </div>
            {errors.mobile && (
                <Text color="red" fontSize="xs">
                    Invaild mobile number
                </Text>
            )}
            <div  style={{width:'100%',margin:'auto'}}>
            <Spacer direction="vertical" size={20} />
            <input
                  className="form-control"
                  placeholder="Enter you name..."
                  {...register("name")}
            />
             {errors.name && (
                <Text color="red" fontSize="xs">
                    Invaild Name
                </Text>
            )}
            <Spacer direction="vertical" size={20} />
            <input
                  className="form-control"
                  placeholder="Enter you email..."
                  {...register("email")}
            />
            </div>
            {errors.email && (
                <Text color="red" fontSize="xs">
                    Invaild Email Address
                </Text>
            )}
            <Spacer direction="vertical" size={30} />
            <SubmitButton size="md" rounded block>Register</SubmitButton>
        </form>
    )
}
const LoginRegister = () => {
    const [tabsState, setTabState] = useState<number>(0);
    const handleTabState = (tabState: number) => {
        setTabState(tabState);
    }
    return (
        <Box>
            <Heading>
                <Text fontSize="sm" className="mb-0"> FOR LAWYERS</Text>
            </Heading>
            <ul className="nav nav-tabs">
                <Tab active={tabsState === 0} onClick={() => handleTabState(0)}>
                    <Button  >Login here</Button>
                </Tab>
                <Tab active={tabsState === 1} onClick={() => handleTabState(1)}>
                    <Button  >Register Now</Button>
                </Tab>
            </ul>
            <div className="px-3 py-4">
                {tabsState === 0
                    ? <Login />
                    : <Register />
                }
            </div>

        </Box>
    )
}

export default LoginRegister
