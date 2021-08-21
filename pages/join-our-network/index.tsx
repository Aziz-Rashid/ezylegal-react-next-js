import { FC } from "react";
import { GetStaticProps } from "next";
import { promises as fs } from "fs";

import MainLayout from "../../components/MainLayout";
import Menus from "../../dtos/Menus.dto";
import { MENUS_FILE } from "../../constants/file-paths";

import CorneredBox from "../../components/CorneredBox";
import GetQouteSection from "../../components/GetQouteSection";
import JoinNetworkQuotes from "../../components/JoinNetworkQuotes";
//styles
import Spacer from "../../styled/Spacer";
import FaqBox from '../../components/FaqBox'
import Text from "../../styled/Text";
import KeenDotSlider from "../../components/KeenDotSlider";
import LoginRegister from "../../components/LoginRegister";
import SubmitButton from "../../styled/Button";
import JoinOurNetworkTable from '../../components/joinNetworktable'

interface JoinOurNetworkProps {
    menus: Menus;
}

const quotes = [
    {
        title: 'Reach more clients',
        description: 'You can chance to serve our ever growing client base'
    },
    {
        title: 'Get variety of work',
        description: 'We are serving clients in variety of services and increasing our services as well'
    },
    {
        title: 'Simple & intutive workflow',
        description: 'Be a part of wonderfull experience and see how intutive our workfows are.'
    },
]
const askQuestion = [
    { question: "Which form is required for shifting of registered office?", answer: "Form MGT-14 and INC-22 are required for shifting of registered office in India." },
    { question: "Which form is required for shifting of registered office?", answer: "Form MGT-14 and INC-22 are required for shifting of registered office in India." },
]

const JoinOurNetwork: FC<JoinOurNetworkProps> = ({ menus }) => {
    return (
        <MainLayout menus={menus} isHome>
            <CorneredBox bgColor="white" bgColorBack="secondry" paddingTop="20px" paddingBottom="70px">
                <div className="container" style={{ margin: '0 10px' }}>
                    <Spacer direction="vertical" size={10} />
                    <div className="row">
                        <div className="col-md-8">
                            <Text fontSize='lg' center weight='bold' color='primary' >
                                <b>JOIN AS A LAWYER</b>
                            </Text>
                            <Text fontSize="xxxl" center weight="bold">Join us in our Mission to make Legal<br /> services accessible</Text>
                            <KeenDotSlider />
                        </div>
                        <div className="col-md-4">
                            <LoginRegister />
                        </div>
                    </div>
                    <Spacer direction="vertical" size={20} />
                    <div className="row">
                    </div>
                </div>
            </CorneredBox>
            <CorneredBox bgColor="secondry"
                paddingTop="35px" paddingBottom="35px" bgColorBack="white">
                <JoinNetworkQuotes quotes={quotes} />
            </CorneredBox>
            <Spacer direction="vertical" size={60} />
            <div>
                <JoinOurNetworkTable />
            </div>
            <Spacer direction="vertical" size={80} />
            <div style={{ width: '50%', margin: 'auto' }}>
                <Text fontSize='xl' center weight='bold'>
                    <b>Not getting a category where you provide services, let us know</b>
                    <Spacer direction="vertical" size={40} />
                    <div style={{ width: '30%', margin: 'auto' }}>
                        <SubmitButton size="lg" rounded block>Send Inquiry</SubmitButton>
                        <Spacer direction="vertical" size={40} />
                    </div>
                </Text>
            </div>
            <CorneredBox bgColor="joinNetwork" bgColorBack="secondry" paddingTop="35px" paddingBottom="35px" >
                <Spacer direction="vertical" size={40} />
                <FaqBox data={askQuestion} />
                <Spacer direction="vertical" size={40} />
            </CorneredBox>
        </MainLayout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const menuData = await fs.readFile(MENUS_FILE, { encoding: "utf-8" });
    const menus: Menus = JSON.parse(menuData);

    return {
        props: {
            menus,
        },
    };
};


export default JoinOurNetwork
