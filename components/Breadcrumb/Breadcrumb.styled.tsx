import styled from "styled-components";

export const BreadcrumbWrapper = styled.nav`
    & > .breadcrumb {
        background-color: transparent;
        padding: .25rem 0;
    }

    & .breadcrumb-item+.breadcrumb-item::before {
        content: '>';
        color: ${({ theme, color }) => theme.textColors['black']};
    }
`;