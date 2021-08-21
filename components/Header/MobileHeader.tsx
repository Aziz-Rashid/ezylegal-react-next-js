import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { Accordion, Navbar } from "react-bootstrap";

import MenuItem from "../../dtos/MenuItem.dto";
import Text from "../../styled/Text";
import SlideDrawer from "../SlideDrawer";
import CorneredBox from "../CorneredBox";
import {
  CardBox,
  CardHeader,
  CardBody,
  LinkText,
  MenuButton,
} from "./Header.styled";

interface AccordionItemProps {
  menu?: MenuItem[];
  depth: number;
}

const AccordionMenu: FC<AccordionItemProps> = ({ menu, depth }) => {
  const [activeKey, setActiveKey] = useState<string>('');

  if (!menu) return null;

  return (
    <Accordion activeKey={activeKey} onSelect={(i: any) => setActiveKey(i)}>
      {menu?.map((menu: MenuItem, i: number) =>
        menu.children.length ? (
          <CardBox key={i}>
            <CardHeader border={depth === 1}>
              <Accordion.Toggle as="span" eventKey={String(i)}>
                <div className="row">
                  <div className="col">
                    <Text as="a" fontSize={depth === 1 ? "lg" : "md"} block>
                      {menu.label}
                    </Text>
                  </div>
                  <div className="col-auto">
                    {activeKey === String(i) ? (
                      <img
                        src="/icons/keyboard_arrow_up.svg"
                        alt="Up"
                        width="12"
                      />
                    ) : (
                      <img
                        src="/icons/keyboard_arrow_down.svg"
                        alt="Down"
                        width="12"
                      />
                    )}
                  </div>
                </div>
              </Accordion.Toggle>
            </CardHeader>
            <Accordion.Collapse eventKey={String(i)}>
              <CardBody>
                <AccordionMenu menu={menu.children[0].children} depth={depth} />
              </CardBody>
            </Accordion.Collapse>
          </CardBox>
        ) : (
          <Link key={i} href={menu.url}>
            <LinkText fontSize={depth === 1 ? "lg" : "md"} as="a" block>
              {menu.label}
            </LinkText>
          </Link>
        )
      )}
    </Accordion>
  );
};

interface MobileHeaderProps {
  headerMenu?: MenuItem[];
  bgColorBack?:
    | "primary"
    | "secondry"
    | "darkBlue"
    | "skyBlue"
    | "white"
    | "lightSkyBlue";
};

const MobileHeader: FC<MobileHeaderProps> = ({ headerMenu, bgColorBack }) => {
  const [isOpen, setIsOpen] = useState(false);
  const nodeRef = useRef<any>();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (nodeRef.current && nodeRef.current.contains(e.target)) {
        // inside click
        return;
      }

      // outside click
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <CorneredBox bgColor="white" bgColorBack={bgColorBack}>
      <div className="container py-2">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-flex align-items-center">
              <MenuButton className="mr-2" onClick={() => setIsOpen(!isOpen)}>
                <img src="/icons/menu_24px.svg" alt="Menu" width="22" />
              </MenuButton>
              <Link href="/">
                <Navbar.Brand>
                  <img
                    src="/images/logo.svg"
                    alt="Logo"
                    height="28"
                    className="d-inline-block align-text-top"
                  />
                </Navbar.Brand>
              </Link>
            </div>
          </div>
          <div className="col-auto">
            <img src="/icons/search_24px.svg" alt="Search" width="22" />
          </div>
        </div>
      </div>
      
      <SlideDrawer nodeRef={nodeRef} isOpen={isOpen}>
        <Link href="#">
          <LinkText>Register Now</LinkText>
        </Link>
        <Link href="#">
          <LinkText>Login</LinkText>
        </Link>
        <AccordionMenu menu={headerMenu} depth={1} />
      </SlideDrawer>
    </CorneredBox>
  );
};

export default MobileHeader;
