import { FC, useMemo, useState, useEffect } from "react";
import { Accordion, Card } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { sumBy } from "lodash";
import getConfig from "next/config";
import axios from "axios";

import { RootState } from "../../redux/store";
import { getTaxes } from "../../redux/tax/tax.actions";
import savePercentage from "../../utils/savePercentage";
import Text from "../../styled/Text";
import Spacer from "../../styled/Spacer";
import Button from "../../styled/Button";
import RazorpayCheckout from "../RazorpayCheckout";
import RadioBox from "../RadioBox/index";
import PaymentSummaryBox from "../PaymentSummaryBox";
import {
  CheckoutWrapper,
  CardHeader,
  CheckoutCard,
} from "./CheckoutBox.styled";
import { checkout } from "../../redux/currentOrder/currentOrder.actions";

interface CheckoutFormData {
  name: string;
  email: string;
  countryCode: string;
  mobile: string;
  type: string;
}

const besicDetailSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  countryCode: yup.string().required(),
  type: yup.string().required(),
  mobile: yup.string().matches(new RegExp("[0-9]{10}")).required(),
});

const CheckoutBox: FC = () => {
  const { publicRuntimeConfig } = getConfig();
  const { APP_NAME, RAZORPAY_KEY_ID } = publicRuntimeConfig;

  const [activeKey, setActiveKey] = useState<string>("0");
  const [formData, setFormData] = useState<CheckoutFormData | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((store: RootState) => store.cart);
  const tax = useSelector((store: RootState) => store.tax);
  const {
    register,
    unregister,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(besicDetailSchema),
    defaultValues: {
      type: "INDIVIDUAL",
    },
  });
  const watchedType = watch<any>("type");

  useEffect(() => {
    dispatch(getTaxes(router.locale || "in"));
  }, []);

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

  const onSubmit = handleSubmit((data) => {
    dispatch(checkout(data, cart, tax, () => {
      setFormData(data);
      setActiveKey("1");
    }));
  });

  const createOrder = async () => {
    const res = await axios.post("/api/orders");
    return res.data;
  };

  const checkoutHandler = async (response: any) => {
    const data = {
      // orderCreationId: order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpayOrderId: response.razorpay_order_id,
      razorpaySignature: response.razorpay_signature,
    };

    router.replace("/purchase-summary");
  };

  return (
    <CheckoutWrapper>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8">
            <Accordion activeKey={activeKey}>
              <CheckoutCard>
                <CardHeader isSelected={activeKey === "0"}>
                  <Accordion.Toggle as="div" eventKey="0">
                    {activeKey === "0" ? (
                      <Text fontFamily="montserrat" fontSize="lg" color="white">
                        Fill your Contact Details
                      </Text>
                    ) : (
                        <>
                          <Text fontFamily="montserrat" color="secondry">
                            {formData?.name}
                          </Text>
                          <img
                            src="/icons/email_black.svg"
                            alt="Email"
                            width="20"
                          />
                          <Spacer direction="horizontal" size={10} />
                          <Text color="secondry" inline>
                            {formData?.email}
                          </Text>
                          <Spacer direction="horizontal" size={10} />
                          <img
                            src="/icons/phone_black.svg"
                            alt="Phone"
                            width="20"
                          />
                          <Spacer direction="horizontal" size={10} />
                          <Text color="secondry" inline>
                            {formData?.mobile}
                          </Text>
                        </>
                      )}
                  </Accordion.Toggle>
                </CardHeader>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <form onSubmit={onSubmit}>
                      <div className="row align-items-center">
                        <div className="col-12 col-md-4">
                          <Spacer size={25} direction="vertical" />
                          <Text fontSize="sm" as="label" color="label">
                            You are
                          </Text>
                        </div>
                        <div className="col-12 col-md-8" >
                          <Controller
                            control={control}
                            name="type"
                            render={({ field: { value, ref, onChange } }) => {
                              return (
                                <>
                                  <RadioBox
                                    checked={"INDIVIDUAL" === value}
                                    value="INDIVIDUAL"
                                    name="type"
                                    defaultChecked
                                    onChange={(e) => e.target.checked && onChange(e.target.value)}
                                    ref={ref}
                                  >
                                    <Text>Individual</Text>
                                  </RadioBox>
                                  <Spacer direction="horizontal" size={15} />
                                  <RadioBox
                                    checked={"COMPANY" === value}
                                    value="COMPANY"
                                    name="type"
                                    onChange={(e) => e.target.checked && onChange(e.target.value)}
                                    ref={ref}
                                  >
                                    <Text>Corporate</Text>
                                  </RadioBox>
                                </>
                              );
                            }}
                          />
                        </div>
                        <div className="col-12 col-md-4">
                          <Spacer size={25} direction="vertical" />
                          <Text fontSize="sm" as="label" color="label">
                            Your Name
                          </Text>
                        </div>
                        <div className="col-12 col-md-8">
                          <input
                            className="form-control"
                            {...register("name")}
                          />
                          {errors.name && (
                            <Text color="red" fontSize="xs">
                              {errors.name?.message}
                            </Text>
                          )}
                        </div>
                      </div>
                      <Spacer size={25} direction="vertical" />
                      <div className="row align-items-center">
                        <div className="col-12 col-md-4">
                          <Text fontSize="sm" as="label" color="label">
                            Email Address
                          </Text>
                        </div>
                        <div className="col-12 col-md-8">
                          <input
                            className="form-control"
                            {...register("email")}
                          />
                          {errors.email && (
                            <Text color="red" fontSize="xs">
                              {errors.email?.message}
                            </Text>
                          )}
                        </div>
                      </div>
                      <Spacer size={25} direction="vertical" />
                      <div className="row align-items-center">
                        <div className="col-12 col-md-4">
                          <Text fontSize="sm" as="label" color="label">
                            Mobile No.
                          </Text>
                        </div>
                        <div className="col-12 col-md-8">
                          <div className="d-flex">
                            <select
                              className="form-control"
                              {...register("countryCode")}
                            >
                              <option value="91">+91</option>
                            </select>
                            <Spacer size={15} direction="horizontal" />
                            <input
                              className="form-control"
                              {...register("mobile", { maxLength: 10 })}
                            />
                          </div>
                          {errors.mobile && (
                            <Text color="red" fontSize="xs">
                              Invaild mobile number
                            </Text>
                          )}
                        </div>
                      </div>
                      <Spacer size={25} direction="vertical" />
                      <div className="row">
                        <div className="col-12 col-md-4"></div>
                        <div className="col-12 col-md-8">
                          <Button size="md" rounded>
                            Continue
                            <img
                              src="/icons/arrow-forward.svg"
                              alt="Continue"
                              width="15"
                            />
                          </Button>
                        </div>
                      </div>
                    </form>
                  </Card.Body>
                </Accordion.Collapse>
              </CheckoutCard>
              <Spacer direction="vertical" size={20} />
              <CheckoutCard>
                <CardHeader isSelected={activeKey === "1"}>
                  <Accordion.Toggle as="div" eventKey="1">
                    <Text
                      fontFamily="montserrat"
                      fontSize="lg"
                      color={activeKey === "1" ? "white" : "secondry"}
                    >
                      Payment Options
                    </Text>
                  </Accordion.Toggle>
                </CardHeader>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <RazorpayCheckout
                      razorpay_key={RAZORPAY_KEY_ID}
                      createOrder={createOrder}
                      handler={checkoutHandler}
                      name={APP_NAME}
                      description="Payment for your order"
                      image={"/images/logo.svg"}
                      prefill={{
                        name: formData?.name,
                        contact: formData?.countryCode + " " + formData?.mobile,
                        email: formData?.email,
                      }}
                      theme={{ color: "#396AE8" }}
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </CheckoutCard>
            </Accordion>
          </div>
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
    </CheckoutWrapper>
  );
};

export default CheckoutBox;
