import { CorneredBoxInner, CorneredBoxWrapper } from "./CorneredBox.styled";

interface CorneredBoxProps {
    bgColorBack?: 'primary' | 'secondry' | 'darkBlue' | 'skyBlue' | 'white' | 'lightSkyBlue';
    bgColor?: 'primary' | 'secondry' | 'darkBlue' | 'skyBlue' | 'white' | 'lightSkyBlue'|'joinNetwork';
    paddingTop?: string;
    paddingBottom?: string;
    children: React.ReactNode;
};

const CorneredBox = ({ children, bgColorBack, bgColor, ...props }: CorneredBoxProps) => (
    <CorneredBoxWrapper backgroundColor={bgColorBack}>
        <CorneredBoxInner backgroundColor={bgColor} {...props}>
            {children}
        </CorneredBoxInner>
    </CorneredBoxWrapper>
);

export default CorneredBox;