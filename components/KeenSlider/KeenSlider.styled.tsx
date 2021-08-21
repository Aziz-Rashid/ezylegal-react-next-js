import styled, { css } from "styled-components";

interface ArrowButtonStyledProps {
    leftArrow?: boolean;
    rightArrow?: boolean;
}

export const ArrowButton = styled.button<ArrowButtonStyledProps>`
    background-color: ${({ theme }) => theme.backgroundColors.primary};
    border: 0;
    padding: 4px 12px;

    ${(props) =>
        props.leftArrow &&
        css`
            border-radius: 5px 0 0 5px;
            margin-right: 30px;
        `}
    ${(props) =>
        props.rightArrow &&
        css`
            border-radius: 0 5px 5px 0;
            margin-left: 30px;
        `}

    & > img {
        vertical-align: center;
    }
`;