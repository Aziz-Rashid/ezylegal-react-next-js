import styled, { css } from "styled-components";

interface ShadowCardProps {
    backgroundColor?: 'primary' | 'secondry' | 'darkBlue' | 'skyBlue' | 'white' | 'lightSkyBlue';
    bordered?: boolean;
}

const ShadowCard = styled.div<ShadowCardProps>`
    background-color: ${({ theme, backgroundColor }) => theme.backgroundColors[backgroundColor || 'white']};
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.09);
    border-radius: 8px;
    margin: 10px;
    padding: 30px;

    ${(props) =>
        props.bordered &&
        css`
            border: 1px solid #E8E8E8;
        `}
`;

export default ShadowCard;