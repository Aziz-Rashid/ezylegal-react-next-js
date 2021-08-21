import styled, { css } from "styled-components";

interface ButtonProps {
    color?: 'black' | 'white' | 'gray' | 'primary' | 'secondry';
    backgroundColor?: 'primary' | 'secondry' | 'darkBlue' | 'skyBlue' | 'white' | 'lightSkyBlue' | 'gray';
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    cornered?: boolean;
    rounded?: boolean;
    outline?: boolean;
    block?: boolean;
}

const Button = styled.button<ButtonProps>`
    background-color: ${({ theme, backgroundColor }) => theme.backgroundColors[backgroundColor || 'primary']};
    color: ${({ theme, color }) => theme.textColors[color || 'white']};
    border: none;
    display: inline-block;
    text-align: center;

    ${(props) =>
        props.size === "xs" &&
        css`
            font-size: ${({ theme }) => theme.fontSize['xs']};
            height: 24px;
            padding: 4px 14px;
        `}

    ${(props) =>
        props.size === "sm" &&
        css`
            font-size: ${({ theme }) => theme.fontSize['sm']};
            height: 34px;
            padding: 6px 24px;
        `}

    ${(props) =>
        props.size === "md" &&
        css`
            font-size: ${({ theme }) => theme.fontSize['md']};
            height: 42px;
            padding: 10px 32px;
        `}

    ${(props) =>
        props.size === "lg" &&
        css`
            font-size: ${({ theme }) => theme.fontSize['lg']};
            height: 50px;
            padding: 10px 45px;
        `}
    
    ${(props) =>
        props.cornered &&
        css`
            border-radius: 4px;
        `}
    
    ${(props) =>
        props.rounded &&
        css`
            border-radius: 50px;
        `}
    
    ${(props) =>
        props.outline &&
        css`
            background-color: transparent;
            border: 1px solid ${({ theme }) => theme.backgroundColors[props.backgroundColor || 'primary']};
        `}

    ${(props) =>
        props.block &&
        css`
            display: block;
            width: 100%;
        `}

    &:hover {
        color: ${({ theme, color }) => theme.textColors[color || 'white']};
        background-color: ${({ theme, backgroundColor }) => theme.backgroundColors[backgroundColor || 'primary']};

        ${(props) =>
            props.outline &&
            css`
                background-color: transparent;
                color: ${({ theme }) => theme.textColors[props.color || 'white']};
                border: 1px solid ${({ theme }) => theme.backgroundColors[props.backgroundColor || 'primary']};
            `}

    }

    & > img {
        vertical-align: middle;
        margin-left: 8px;
    }
`;

export default Button;