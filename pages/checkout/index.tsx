import { GetStaticProps } from "next";
import { FC } from "react";
import { promises as fs } from "fs";
import Head from "next/head";
import {
  Checkout as PaytmCheckout,
  CheckoutProvider,
} from "paytm-blink-checkout-react";

import MainLayout from "../../components/MainLayout";
import { MENUS_FILE } from "../../constants/file-paths";
import Menus from "../../dtos/Menus.dto";
import CheckoutBox from "../../components/CheckoutBox";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";


const CONFIG: any = {
  style: {
    themeBackgroundColor: "#396AE8",
    headerBackgroundColor: "#F3F7FF",
    headerColor: "#000",
    // bodyBackgroundColor: "#fafafb",
    // bodyColor: "",
    // themeColor: "#ffffff",
    errorColor: "",
    successColor: "",
    card: {
      padding: "",
      backgroundColor: "",
    },
  },
  jsFile: "",
  // data: {
  //     orderId: "Order_62684",
  //     amount: "1",
  //     token: "9e7b7c3f8316485fb118cf8ccd45e6251623791064008",
  //     tokenType: "TXN_TOKEN",
  //     userDetail: {
  //         mobileNumber: "",
  //         name: ""
  //     }
  // },
  merchant: {
    mid: "MTOshh04866525945220",
    name: "EzyLeagal",
    logo: "/images/logo.svg",
    redirect: false,
  },
  mapClientMessage: {},
  labels: {},
  payMode: {
    labels: {},
    filter: {
      exclude: ["NB", "CARD"],
    },
    order: ["LOGIN"],
  },
  transactionStatus: "PENDING",
  flow: "DEFAULT",
};

interface CheckoutProps {
  menus: Menus;
}

const Checkout: FC<CheckoutProps> = ({ menus }) => {
  const [isPaytm, setIsPaytm] = useState<boolean>(false);

  const notifyMerchantHandler = (eventType: any, data: any) => {
    console.log(eventType, data);
  };

  const transactionStatusHandler = (data: any) => {
    console.log(data);
    setIsPaytm(false);
  };

  const attachMerchantHandler = () => {
    CONFIG.handler = {
      notifyMerchant: notifyMerchantHandler,
      transactionStatus: transactionStatusHandler,
    };
    return CONFIG;
  };

  const [config, setConfig] = useState<any>(attachMerchantHandler());
  useEffect(() => {
    axios("/api/paytm")
      .then((res) => {
        setConfig({
          ...config,
          data: {
            orderId: res.data.orderId,
            token: res.data.body.txnToken,
            amount: "1",
            tokenType: "TXN_TOKEN",
          },
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const openPaytm = () => {
    setIsPaytm(true);
    setTimeout(() => {
      setIsPaytm(false);
      console.log("close");
    }, 1000);
  };

  return (
    <MainLayout menus={menus}>
      <Head>
        <title>Checkout &#8211; EzyLegal</title>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <script
          type="application/javascript"
          crossOrigin="anonymous"
          src="https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/MTOshh04866525945220.js"
        ></script>
      </Head>
      <CheckoutBox />
      {/* <button onClick={openPaytm}>Paytm</button> */}
      {/* <CheckoutProvider config={config} openInPopup={true} env="STAGE">
        {isPaytm && <PaytmCheckout />}
      </CheckoutProvider> */}
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const menuData = await fs.readFile(MENUS_FILE, { encoding: "utf-8" });
  const menus: Menus = JSON.parse(menuData);

  return {
    props: {
      menus,
    },
  };
};

export default Checkout;
