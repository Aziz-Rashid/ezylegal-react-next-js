import { FC } from "react";
import { GetStaticProps } from "next";
import { promises as fs } from 'fs';
import Head from "next/head";
import { MENUS_FILE,Privacy_File } from "../constants/file-paths";
import Menus from "../dtos/Menus.dto";
import MainLayout from "../components/MainLayout";
import CorneredBox from "../components/CorneredBox";
import Text from "../styled/Text";

const PrivacyPolicy: FC<any> = ({ menus,terms }) => {
    console.log(terms)
    return (
        <MainLayout menus={menus} headerBgColorBack="skyBlue">
            <Head>
                <title>Privacy Policy</title>
            </Head>
            <CorneredBox bgColor="white" bgColorBack="secondry">
                <div style={{ paddingLeft: "70px", paddingTop: '20px', paddingBottom: "80px", width: "60%" }}>
                    <Text weight="semibold" fontFamily="manrope" fontSize="md">Home <span style={{ fontSize: '18px' }}>{'>'}</span> Privacy Policy  </Text>
                    <Text weight="bold"  fontFamily="montserrat" fontSize="xl" style={{ margin: '30px 0px 30px 0px' }} >{terms.page.title}</Text>
                    {/* <Text fontFamily="manrope" fontSize="lg" >{terms.page.content}</Text> */}
                    <div
                        dangerouslySetInnerHTML={{
                            __html: terms.page.content
                        }}></div>
                    <Text fontFamily="manrope" fontSize="md" >{terms.page.addition_field.subHeading}</Text>
                    <Text fontFamily="manrope" fontSize="md" >{terms.page.addition_field.subSubHeading} </Text>
                </div>
            </CorneredBox>
        </MainLayout>
    );
};


export const getStaticProps: GetStaticProps = async () => {
    // fetch menus
    const menuData = await fs.readFile(MENUS_FILE, { encoding: 'utf-8' });
    const menus: Menus = JSON.parse(menuData);
    // Fetched Terms And Condition data 
    const privacydata = await fs.readFile(Privacy_File, { encoding: 'utf-8' });
    const terms: Menus = JSON.parse(privacydata);
    return {
        props: {
            menus,
            terms
        }
    };
};


export default PrivacyPolicy