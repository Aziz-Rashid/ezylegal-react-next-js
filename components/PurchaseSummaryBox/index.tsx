import { useState, useMemo } from "react";

import CorneredBox from "../CorneredBox";
import Text from "../../styled/Text";
import Spacer from "../../styled/Spacer";
// import CrossedText from "../../styled/CrossedText";
import Alert from "../../styled/Alert";
import { StepWrapper } from './PurchaseSummaryBox.styled';
import CircledText from "../../styled/CircledText";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { sumBy } from "lodash";
import savePercentage from "../../utils/savePercentage";
import PaymentSummaryBox from '../PaymentSummaryBox'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const PurchaseSummaryBox = () => {
  const cart = useSelector((store: RootState) => store.cart);
  const tax = useSelector((store: RootState) => store.tax);
  const [tab, setTab] = useState<string>("STEP1");

  const prices = useMemo(() => {
    const subTotal = sumBy(cart.items, (o) => Number(o.salePrice));
    const taxTotal = Math.ceil((subTotal / 100) * tax?.rate);

    return {
      totalRegularPrice: sumBy(cart.items, (o) => Number(o.regularPrice)),
      totalSalePrice: subTotal,
      totalPrice: subTotal + taxTotal,
      taxTotal: taxTotal,
    };
  }, [cart.items, tax]);

  const totalSaving = useMemo(() => {
    return {
      totalSaving: prices.totalRegularPrice - prices.totalSalePrice,
      totalSavingPer: savePercentage(
        prices.totalRegularPrice,
        prices.totalSalePrice
      ),
    };
  }, [prices]);
  return (
    <CorneredBox
      bgColor="white"
      bgColorBack="secondry"
      paddingTop="20px"
      paddingBottom="70px"
    >
      <div className="container">
        <Alert>
          <Text fontSize="sm" color="white">Thanking you for buying a service with us</Text>
        </Alert>
        <Spacer direction="vertical" size={40} />
        <div className="row">
          <div className="col-12 col-md-8">
            <StepWrapper>
              <div className="row">
                <div className="col-auto">
                  <CircledText inline size="sm" color="white" backgroundColor="primary">1</CircledText>
                  <Spacer direction="horizontal" size={15} />
                  <Text inline color="primary">Fill your Details</Text>
                </div>
                <div className="col-auto">
                  <Text inline>-----------</Text>
                </div>
                {tab === "STEP2" ? (
                  <div className="colcol-auto">
                    <CircledText inline color="white" size="sm" backgroundColor="primary">2</CircledText>
                    <Spacer direction="horizontal" size={15} />
                    <Text inline color="primary">Schedule a Call</Text>
                  </div>
                ) : (
                    <div className="colcol-auto">
                      <CircledText inline color="primary" size="sm">2</CircledText>
                      <Spacer direction="horizontal" size={15} />
                      <Text inline>Schedule a Call</Text>
                    </div>
                  )}
              </div>
            </StepWrapper>
            <Spacer direction="vertical" size={40} />
            {
              tab === "STEP1" ? <Step1 setTab={setTab} /> : <Step2 />
            }
          </div>
          {/* <div className="col-12 col-md-4">
            <PurchaseSummaryWrapper>
              <Text fontSize="lg">Purchase Summary</Text>
              <Spacer direction="vertical" size={20} />
              <div className="row">
                <div className="col">
                  <Text color="secondry">GST</Text>
                </div>
                <div className="col text-right">
                  <Text color="secondry">&#8377; 123</Text>
                  <Spacer direction="vertical" size={5} />
                  <CrossedText fontSize="xs" inline>
                    &#8377; 150 /-
                  </CrossedText>
                  <Spacer direction="horizontal" size={8} />
                  <Text color="gray" fontSize="xs" inline>
                    10 % off){" "}
                  </Text>
                </div>
              </div>
            </PurchaseSummaryWrapper>
          </div> */}
          <div className="col-12 col-md-4">
            <PaymentSummaryBox
              items={cart.items}
              subTotal={prices.totalSalePrice}
              taxTotal={prices.taxTotal}
              totalSaving={totalSaving}
              totalPrice={prices.totalPrice}
            />
          </div>
        </div>
      </div>
    </CorneredBox>
  );
};

export default PurchaseSummaryBox;
