import { GetStaticProps } from "next";
import { FC } from "react";
import { promises as fs } from "fs";
import Link from 'next/link';

import MainLayout from "../components/MainLayout";
import { MENUS_FILE } from "../constants/file-paths";
import Menus from "../dtos/Menus.dto";
import Text from "../styled/Text";
import Button from "../styled/Button";
import CorneredBox from '../components/CorneredBox';
import Spacer from "../styled/Spacer";

interface NotFoundProps {
    menus: Menus
};

const NotFound: FC<NotFoundProps> = ({ menus }) => {
    return (
        <MainLayout menus={menus}>
            <CorneredBox bgColor="white" bgColorBack="secondry" paddingTop="70px" paddingBottom="70px">
                <div className="container text-center">
                    <Text fontSize="xxxl" fontFamily="montserrat">404</Text>
                    <Text fontSize="lg" fontFamily="montserrat">Page not found!</Text>
                    <Spacer direction="vertical" size={15} />
                    <Link href="/"><Button as="a" size="md" rounded>Go to Home</Button></Link>
                </div>
            </CorneredBox>
        </MainLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    // fetch menus
    const menuData = await fs.readFile(MENUS_FILE, { encoding: 'utf-8' });
    const menus: Menus = JSON.parse(menuData);

    return {
        props: {
            menus
        }
    };
};

export default NotFound;