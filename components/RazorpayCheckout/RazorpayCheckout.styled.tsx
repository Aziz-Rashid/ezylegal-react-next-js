import styled from "styled-components";

export const RazorpayCheckoutWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
`;

export const RazorpayCheckoutItem = styled.label`
    cursor: pointer;
    display: flex;
    align-items: center;
    
    & input {
        margin-right: 15px;
    }
`;