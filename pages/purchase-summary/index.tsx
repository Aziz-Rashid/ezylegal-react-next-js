import { GetStaticProps } from "next";
import { FC } from "react";
import { promises as fs } from 'fs';
import Head from "next/head";

import MainLayout from "../../components/MainLayout";
import { MENUS_FILE } from "../../constants/file-paths";
import Menus from "../../dtos/Menus.dto";
import PurchaseSummaryBox from '../../components/PurchaseSummaryBox';

interface PurchaseSummaryProps {
    menus: Menus;
    env: any;
};

const PurchaseSummary: FC<PurchaseSummaryProps> = ({ menus }) => {
    return (
        <MainLayout menus={menus}>
            <Head>
                <title>Payment Summary &#8211; EzyLeagal</title>
            </Head>
            <PurchaseSummaryBox/>
        </MainLayout>
    );
};


export const getStaticProps: GetStaticProps = async () => {
    const menuData = await fs.readFile(MENUS_FILE, { encoding: 'utf-8' });
    const menus: Menus = JSON.parse(menuData);

    return {
        props: {
            menus
        }
    };
};

export default PurchaseSummary;