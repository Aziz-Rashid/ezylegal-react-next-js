import {FC, useLayoutEffect, useState} from "react";

import Menus from "../../dtos/Menus.dto";
import Footer from "../Footer/Footer";
import Header from "../Header";
import {DeviceTypes} from "../../constants/deviceTypes";

interface MainLayoutProps {
    menus: Menus;
    headerBgColorBack?:  'primary' | 'secondry' | 'darkBlue' | 'skyBlue' | 'white' | 'lightSkyBlue';
    children: React.ReactNode;
    isHome?: boolean;
}

const MainLayout: FC<MainLayoutProps> = ({ menus, headerBgColorBack, isHome, children }) => {
    const [device, setDevice] = useState(DeviceTypes.DESKTOP);

    useLayoutEffect(() => {
        const handleResize = () => {
            setDevice(window.innerWidth < 768 ? DeviceTypes.MOBILE : DeviceTypes.DESKTOP);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.addEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Header headerMenu={menus.header} bgColorBack={headerBgColorBack} device={device}/>
            { children }
            <Footer footer1Menu={menus.footer1} isHome={isHome} device={device}/>
        </>
    );
};

export default MainLayout;