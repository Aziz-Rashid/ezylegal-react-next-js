import Link from "next/link";
import Zendesk from "react-zendesk";
import MenuItem from "../../dtos/MenuItem.dto";
import {
  Footer as StyledFooter,
  FloatingButton,
} from "./DashboardFooter.styled";
import Text from "../../styled/Text";
import Spacer from "../../styled/Spacer";

const ZENDESK_KEY = "cda34b4e-33b3-423c-9ced-053740ee0306";

const setting = {
  color: {
    theme: "#000",
  },
  launcher: {
    chatLabel: {
      "en-US": "Need Help",
    },
  },
  contactForm: {
    fields: [
      { id: "description", prefill: { "*": "My pre-filled description" } },
    ],
  },
};

const DashboardFooter = () => {
  return (
    <>
      <StyledFooter>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5">
              <Text color="white" fontSize="sm">
                © 2021 Neo Online Ventures Pvt Ltd. All rights reserved.
              </Text>
              <Text color="white" fontSize="sm">
                We are not a law firm, or a substitute for a Lawyer or law firm.
                We are also not an "lawyer referral service". Use of our
                products and services are governed by our{" "}
                <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
              </Text>
            </div>
            <div className="col-12 col-md-7 text-right">
              
                <>
                  <Link href="mailto:info@easylegal.in">
                    <Text as="a" color="white" fontSize="sm" inline>
                      <img
                        src="/icons/email_24px.svg"
                        width="16"
                        alt="email"
                        className="mr-2"
                      />
                      info@easylegal.in
                    </Text>
                  </Link>
                  <Spacer direction="horizontal" size={25} />
                  <Link href="tel:18000002342">
                    <Text as="a" color="white" fontSize="sm" inline>
                      <img
                        src="/icons/phone_24px.svg"
                        width="16"
                        alt="phone"
                        className="mr-2"
                      />
                      1800 000 2342
                    </Text>
                  </Link>
                </>
            </div>
          </div>
        </div>
      </StyledFooter>
      <Zendesk
        defer
        zendeskKey={ZENDESK_KEY}
        {...setting}
        onLoaded={() => console.log("is loaded")}
      />
      <FloatingButton>
        <img src="/icons/whatsapp.svg" width="34" alt="whatsapp" />
      </FloatingButton>
    </>
  );
};

export default DashboardFooter;
