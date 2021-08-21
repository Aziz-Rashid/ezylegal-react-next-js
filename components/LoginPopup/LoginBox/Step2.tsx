import { FC, useState } from "react";
import OtpInput from "react-otp-input";

import Button from "../../../styled/Button";
import Text from "../../../styled/Text";
import Spacer from "../../../styled/Spacer";

interface Step2Props {
  setLoginData: Function;
  loginData: any;
}

const Step2: FC<Step2Props> = ({ loginData, setLoginData }) => {
  const [otp, setOtp] = useState('');

  return (
    <>
      <Text fontSize="md" color="gray">
        Enter OTP sent to your Mobile No. <br/> +{ loginData.countryCode }-{ loginData.mobile }{" "}
        <Text
          as="a"
          fontSize="md"
          inline
          color="primary"
          onClick={() => setLoginData(null)}
        >
          Change
        </Text>
      </Text>
      <Spacer direction="vertical" size={15} />
      <OtpInput 
        value={otp} 
        onChange={setOtp} 
        inputStyle={{
          width: '100%',
          height: '55px',
          borderRadius: '5px',
          border: '1px solid #396AE8'
        }} 
        containerStyle={{
          gap: '20px'
        }}
      />
      <Spacer direction="vertical" size={30} />
      <Button size="md" block rounded color="white" backgroundColor="primary">
        Login Now
      </Button>
      <Spacer direction="vertical" size={60} />
      <Text fontSize="md" color="gray">
        If OTP is not received{" "}
        <Text
          as="a"
          fontSize="md"
          inline
          color="primary"
        >
          Send Again
        </Text>
      </Text>
    </>
  );
};

export default Step2;
