import { FC, useState } from 'react';
import { ModalProps } from 'react-bootstrap';

import LoginBox from './LoginBox';
import SignupBox from './SignupBox';
import { LoginModal, ModalBody } from './LoginPopup.styled';

const LoginPopup: FC<ModalProps> = ({ show, handleClose }) => {
    const [tab, setTab] = useState<string>("LOGIN");
     
    return (
        <LoginModal show={true} onHide={handleClose} centered size="xl">
            <ModalBody>
                { tab === "LOGIN" ? <LoginBox setTab={setTab}/> : <SignupBox setTab={setTab} handleClose={handleClose}/>}
            </ModalBody>
        </LoginModal>
    );
};

export default LoginPopup;