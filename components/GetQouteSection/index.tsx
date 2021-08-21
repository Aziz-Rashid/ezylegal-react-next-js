import { useState } from "react";
import { FC } from "react";
import Button from "../../styled/Button";
import Text from "../../styled/Text";
import CorneredBox from "../CorneredBox";
import TellUsPopup from "../TellUsPopup";

// interface GetQouteSectionProps {
//   bgColorBack?: 'primary' | 'secondry' | 'darkBlue' | 'skyBlue' | 'white' | 'lightSkyBlue';
// }

const GetQouteSection:FC<any> = ({ bgColorBack,home_page }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <CorneredBox bgColor="secondry" bgColorBack={bgColorBack} paddingTop="35px" paddingBottom="35px">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-8">
            <div className="d-flex align-items-center">
              <img src={home_page?.smallBanner?.image?.sourceUrl} width="120" className="mr-4" />
              <Text color="white" weight="semibold">{home_page?.smallBanner?.summary}</Text>
            </div>
          </div>
          <div className="col-12 col-md-4 text-center">
            <Button rounded outline backgroundColor="white" size="lg" onClick={handleShow}>{home_page?.smallBanner?.buttonText}</Button>
          </div>
        </div>
      </div>
      <TellUsPopup show={show} onHide={handleClose} size="lg"/>
    </CorneredBox>
  );
}

export default GetQouteSection;