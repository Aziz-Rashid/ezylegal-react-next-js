import {FC} from "react";
import Link from "next/link";
import Zendesk from "react-zendesk";

import MenuItem from "../../dtos/MenuItem.dto";
import {FloatingButton, Footer as StyledFooter, Footer2Menu, FooterMenu, FooterTop,} from "./Footer.styled";
import Text from "../../styled/Text";
import Spacer from "../../styled/Spacer";
import Button from "../../styled/Button";
import Divider from "../../styled/Divider";
import {contactNumber, emailAddress} from "../../constants/contactInformation";
import {DeviceTypes} from "../../constants/deviceTypes";

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
interface FooterProps {
  footer1Menu?: MenuItem[];
  footer2Menu?: MenuItem[];
  isHome?: boolean;
  device: DeviceTypes;
}

const Footer: FC<FooterProps> = ({ footer1Menu, isHome, device}) => {
  return (
    <>
      {isHome ? (
        <FooterTop>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md">
                <img src="/images/footer-logo.svg" alt="Logo" />
              </div>
              <div className="col-12 col-md-5 text-center">
                <Text fontSize="lg" fontFamily="montserrat" color="white">
                  Get Usefull tips and info from our Newsletter
                </Text>
                <Spacer size={20} direction="vertical" />
                <div className="d-flex">
                  <input className="form-control" placeholder="Your Email Id" />
                  <Spacer direction="horizontal" size={15} />
                  <Button size="md" cornered>
                    Signup
                  </Button>
                </div>
              </div>
              <div className="col-12 col-md" />
            </div>
            <Divider color="white" margin="40px" />
            <div className="row">
              <div className="col-12 col-md-5">
                <Text color="white" fontSize="lg">
                  About
                </Text>
                <Text color="white" fontSize="sm">
                  We like to do businessat Some content will come here <br />
                  Read More
                </Text>
                <Spacer size={20} direction="vertical" />
                {footer1Menu?.length ? (
                  <FooterMenu>
                    {footer1Menu.map((menu) => (
                      <li key={menu.id}>
                        <Link href={menu.url}>
                          <Text as="a" fontSize="sm" color="white">
                            {menu.label}
                          </Text>
                        </Link>
                      </li>
                    ))}
                  </FooterMenu>
                ) : null}
              </div>
              <div className="col-12 col-md-7">
                <div className="row justify-content-between">
                  <div className="col-12 col-md-auto">
                    <Text color="white" fontSize="lg">
                      Join our Network
                    </Text>
                    <Footer2Menu>
                      <li>
                        <Link href="#">
                          <Text as="a" color="white" fontSize="sm">
                            Lawyers / Law Firms
                          </Text>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Text as="a" color="white" fontSize="sm">
                            Chartered Accountant
                          </Text>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Text as="a" color="white" fontSize="sm">
                            Company Secretary
                          </Text>
                        </Link>
                      </li>
                    </Footer2Menu>
                  </div>
                  <div className="col-12 col-md-auto">
                    <Text color="white" fontSize="lg">
                      Socials
                    </Text>
                    <FooterMenu>
                      <li>
                        <Link href="https://twitter.com/ezylegal">
                          <a>
                            <img
                              src="/icons/twitter.svg"
                              width="20"
                              alt="email"
                            />
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="https://www.instagram.com/ezylegal/">
                          <a>
                            <img
                              src="/icons/instagram.svg"
                              width="16"
                              alt="instagram"
                            />
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="https://www.facebook.com/ezylegal">
                          <a>
                            <img
                              src="/icons/facebook.svg"
                              width="8"
                              alt="facebook"
                            />
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="https://www.linkedin.com/company/ezylegal ">
                          <a>
                            <img
                              src="/icons/linkedin.svg"
                              width="16"
                              alt="linkedin"
                            />
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <a>
                            <img
                              src="/icons/youtube.svg"
                              width="18"
                              alt="youtube"
                            />
                          </a>
                        </Link>
                      </li>
                    </FooterMenu>
                    <Spacer size={40} direction="vertical" />
                    <Text color="white" fontSize="lg">
                      Contact Us
                    </Text>
                    <Link href={"mailto:" + emailAddress}>
                      <Text as="a" color="white" fontSize="sm" block>
                        <img
                          src="/icons/email_24px.svg"
                          width="16"
                          alt="email"
                          className="mr-2"
                        />
                        {emailAddress}
                      </Text>
                    </Link>
                    <Link href={"tel:" + contactNumber}>
                      <Text as="a" color="white" fontSize="sm" block>
                        <img
                          src="/icons/phone_24px.svg"
                          width="16"
                          alt="phone"
                          className="mr-2"
                        />
                        {contactNumber}
                      </Text>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FooterTop>
      ) : null}
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
                <Link href="/termsandconditions">Terms of Use</Link> and <Link href="/privacy">Privacy Policy</Link>.
              </Text>
            </div>
            <div className="col-12 col-md-7 text-right">
              {!isHome ? (
                <>
                  <Link href={"mailto:" + emailAddress}>
                    <Text as="a" color="white" fontSize="sm" inline>
                      <img
                        src="/icons/email_24px.svg"
                        width="16"
                        alt="email"
                        className="mr-2"
                      />
                      {emailAddress}
                    </Text>
                  </Link>
                  <Spacer direction="horizontal" size={25} />
                  <Link href={"tel:" + contactNumber}>
                    <Text as="a" color="white" fontSize="sm" inline>
                      <img
                        src="/icons/phone_24px.svg"
                        width="16"
                        alt="phone"
                        className="mr-2"
                      />
                      {contactNumber}
                    </Text>
                  </Link>
                </>
              ) : null}
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
      <FloatingButton onClick={() => {
        const internationalFormattedNum = contactNumber
            .replace("+", "")
            .replace("-", "")
            .split(" ")
            .join("");

        console.log(contactNumber, internationalFormattedNum);
        if(device === DeviceTypes.DESKTOP)
          window.open("https://web.whatsapp.com/send?phone=" + internationalFormattedNum);
        else
          window.open("https://api.whatsapp.com/send?phone=" + internationalFormattedNum);
      }} style={{
        cursor: "pointer"
      }}>
        <img src="/icons/whatsapp.svg" width="34" alt="whatsapp" />
      </FloatingButton>
    </>
  );
};

export default Footer;
