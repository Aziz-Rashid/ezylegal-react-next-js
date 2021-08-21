import styled from "styled-components";

export const ProcessStepFlow = styled.ul`
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 30px 60px;
    justify-content: center;
`;

export const ProcessStepItem = styled.li`
    max-width: 20%;
    width: 230px;
    background-color: ${({ theme }) => theme.backgroundColors['lightSkyBlue']};
    padding: 16px 8px;
    position: relative;
    border-radius: 8px;
    &::before {
        content: " ";
        height: 22px;
        width: 22px;
        position: absolute;
        left: -30px;
        top: 50%;
        transform: translate(-50%, -50%);
        background-image: url(/icons/arrow_right_alt_24px.svg);
        background-repeat: no-repeat;
        background-position: center;
    }
    &:first-child:before {
        content: none;
    }
`;