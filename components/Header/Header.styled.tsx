import { Card, Navbar, NavDropdown } from "react-bootstrap";
import styled, { css } from "styled-components";

import Text from "../../styled/Text";

export const NavLink = styled(Text)`
    padding: 1rem 1rem;
    color: ${({ theme }) => theme.textColors['black']};
    margin-bottom: 0px !important;
    min-height: 80px;
    line-height: 50px;
    
    &.active {
        background-color: #F1F9FE;
        border-top: 2px solid #0078DB;
        border-bottom: 2px solid transperant;
    }
`;

export const StyledNavDropdown = styled(NavDropdown)`
    position: static;
    
    & .nav-link {
        padding: 1rem 1rem !important;
        height: 80px;
        line-height: 50px;
    }

    & > .dropdown-menu {
        width: 100%;
        padding: 0;
        border-radius: 0;
        border: 0;
        box-shadow: 0 8px 9px -6px rgb(0 0 0 / 40%);
        top: calc(100% + 1px);
    }
`;

export const StyledNavbar = styled(Navbar)`
background-color: transparent !important;
padding: 0 1rem;
& .navbar-brand {
    padding-top: 1rem;
    padding-bottom: 1rem;
}
`;

export const CardBox = styled(Card)`
    border-radius: 0 !important;
    border: 0;
`;

interface CardHeaderProps {
    border: boolean;
};

export const CardHeader = styled(Card.Header)<CardHeaderProps>`
    background-color: transparent;
    border-radius: 0 !important;
    border: 0;
    padding: 10px 20px;

    ${(props) =>
        props.border &&
        css`
            border-bottom: 1px solid #DAD8D8;
        `}
`;

export const CardBody = styled(Card.Body)`
    background-color: transparent;
    padding: 0 0 0 20px;
`;

export const LinkText = styled(Text)`
    padding: 10px 20px;
    margin: 0;
`;

export const MenuButton = styled.button`
    background-color: transparent;
    border: 0;
`;