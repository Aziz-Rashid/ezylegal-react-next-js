import styled, { css } from "styled-components";

interface CorneredBoxStyledProps {
    backgroundColor?: 'primary' | 'secondry' | 'darkBlue' | 'skyBlue' | 'white' | 'lightSkyBlue' | 'joinNetwork';
}

interface CorneredBoxInnerStyledProps extends CorneredBoxStyledProps {
    paddingTop?: string;
    paddingBottom?: string;
}

export const CorneredBoxWrapper = styled.section<CorneredBoxStyledProps>`
    background-color: ${({ theme, backgroundColor }) => theme.backgroundColors[backgroundColor || 'white']};
    padding-bottom: 2px;
`;

export const CorneredBoxInner = styled.div<CorneredBoxInnerStyledProps>`
    background-color: ${({ theme, backgroundColor }) => theme.backgroundColors[backgroundColor || 'white']};
    border-radius: 0 0 18px 18px;
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);

    ${(props) =>
        props.paddingTop &&
        css`
            padding-top: ${props.paddingTop};
        `}
    ${(props) =>
        props.paddingBottom &&
        css`
            padding-bottom: ${props.paddingBottom};
        `}
`;