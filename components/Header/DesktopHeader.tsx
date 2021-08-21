import { FC, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import Link from 'next/link';

import MenuItem from "../../dtos/MenuItem.dto";
import Button from "../../styled/Button";
import Spacer from "../../styled/Spacer";
import Text from "../../styled/Text";
import CorneredBox from "../CorneredBox";
import SlideSearchBox from "../SlideSearchBox";
import ActiveLink from "../ActiveLink";
import LoginPopup from "../LoginPopup";
import { NavLink, StyledNavDropdown, StyledNavbar } from "./Header.styled";
import DropDownContainer from "./DropDownContainer";

interface HeaderProps {
  headerMenu?: MenuItem[];
  bgColorBack?:
    | "primary"
    | "secondry"
    | "darkBlue"
    | "skyBlue"
    | "white"
    | "lightSkyBlue";
}

const DesktopHeader: FC<HeaderProps> = ({ headerMenu, bgColorBack }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [hoverId, setHoverId] = useState<string>('');
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <CorneredBox bgColor="white" bgColorBack={bgColorBack}>
      <StyledNavbar expand="lg">
        <div className="container d-flex">
          <Link href="/">
            <Navbar.Brand>
              <img
                src="/images/logo.svg"
                alt="Logo"
                height="47"
                className="d-inline-block align-text-top"
              />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* this is list item */}
            <Nav className="m-auto">
              {headerMenu?.map((menu: MenuItem) =>
                menu.children.length ? (
                  <StyledNavDropdown
                    key={menu.id}
                    title={<Text inline>{menu.label}</Text>}
                    id={menu.id}
                    show={menu.id == hoverId && showDropdown && true}
                    onMouseEnter={() =>{
                      setShowDropdown(true)
                      setHoverId(menu.id)
                    }}
                    onMouseLeave={() => {
                      setShowDropdown(false)
                      setHoverId('')
                    }}
                  >
                    <DropDownContainer menu={menu} />
                  </StyledNavDropdown>
                ) : (
                  <ActiveLink key={menu.id} href={menu.url}>
                    <NavLink as="a" fontSize="md">
                      {menu.label}
                    </NavLink>
                  </ActiveLink>
                )
              )}
            </Nav>
            <div>
              <SlideSearchBox />
              <Spacer direction="horizontal" size={10} />
              <Button size="md" rounded onClick={() => setIsOpen(true)}>
                Sign In
              </Button>
            </div>
          </Navbar.Collapse>
        </div>
      </StyledNavbar>
      {/* This is Login popup page  */}
      {isOpen && <LoginPopup show={isOpen} handleClose={handleClose} />}
    </CorneredBox>
  );
};

export default DesktopHeader;
