import styled from "styled-components";

export const FooterMenu = styled.ul`
    padding: 0;
    list-style: none;
    display: flex;
    gap: 20px;
`;

export const Footer2Menu = styled.ul`
    padding: 0;
    list-style: none;

    & > li {
        margin-bottom: 10px;
    }
`;

export const FooterTop = styled.section`
    background-color: ${({ theme }) => theme.backgroundColors['secondry']};
    padding: 40px 0;
    background-image: url("/images/footer-pattern.png");
    background-repeat: no-repeat;
    background-position: right bottom;
`;

export const Footer = styled.footer`
    background-color: ${({ theme }) => theme.backgroundColors['darkBlue']};
    padding: 40px 0;
`;

export const FloatingButton = styled.div`
    position: fixed;
    right: 60px;
    bottom: 60px;
    padding: 13px;
    background-color: ${({ theme }) => theme.backgroundColors['white']};
    border-radius: 60px;
    height: 60px;
    width: 60px;
    z-index: 9999;
`;