import styled, { css } from "styled-components";



interface TabStyledProps {
    active?: boolean;
}

export const Box = styled.div`
    border-radius: 5px;
    box-shadow: 0 0 0 2px rgb(54 132 215 / 3%), 0 0 10px rgb(0 0 0 / 10%);
    background-color: #fff;
    width:100%;
    display:content;
`;

export const Heading = styled.div`
    padding: 10px 0;
    background: #DAEFFD;
    text-align: center;
`;



export const Tab = styled.li<TabStyledProps>`
    width: 50%;
    ${(props) =>
        props.active &&
        css`
        border-bottom: 4px solid #396AE8;
            `}
`;




export const Button = styled.button`
    width: 100%;
    background: white;
    margin-bottom: -1px;
    border: 1px solid transparent;
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
    display: block;
    padding: .5rem 1rem;
`;

export const SubmitButton = styled.button`
border-radius: 20px;
`;
