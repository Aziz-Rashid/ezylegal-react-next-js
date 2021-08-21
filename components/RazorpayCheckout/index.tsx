import { ChangeEvent, FC, useState } from "react";

import Button from "../../styled/Button";
import Spacer from "../../styled/Spacer";
import { RazorpayCheckoutItem, RazorpayCheckoutWrapper } from "./RazorpayCheckout.styled";

const PAYMENT_OPTIONS = {
    "GOOGLE_PAY": "GOOGLE_PAY",
    "CREDIT_CARD": "CREDIT_CARD",
    "NET_BANKING": "NET_BANKING",
    "PAYTM": "PAYTM",
};

interface RazorpayOrder {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    offer_id: null;
    status: string;
    attempts: number;
    notes: any[];
    created_at: number;
};

interface Prefill {
    name?: string;
    email?: string;
    contact?: string;
};

interface Theme {
    hide_topbar?: boolean;
    color?: string;
    backdrop_color?: string;
};

interface Response {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
};

interface RazorpayCheckoutProps {
    createOrder(): Promise<RazorpayOrder>;
    razorpay_key: string | undefined | null;
    prefill?: Prefill | null;
    name?: string;
    description?: string;
    image?: any;
    notes?: any;
    theme?: Theme | null;
    handler(res: Response): void;
};

const RazorpayCheckout: FC<RazorpayCheckoutProps> = ({ createOrder, razorpay_key, ...props }) => {
    const [paymentOption, setPaymentOption] = useState("");

    const onContinueClick = async () => {
        try {
            const result = await createOrder();

            if (!result) throw new Error("Server error. Are you online?");

            const { amount, id: order_id, currency } = result;

            const options: any = {
                key: razorpay_key,
                amount: amount.toString(),
                currency: currency,
                order_id: order_id,
                ...props
            };

            if (paymentOption === PAYMENT_OPTIONS.NET_BANKING) {
                options.config = {
                    display: {
                        blocks: {
                            netbanking: {
                                name: "Pay via NetBanking",
                                instruments: [
                                    {
                                        method: "netbanking",
                                    },
                                ]
                            }
                        },
                        sequence: [
                            "block.netbanking"
                        ],
                        preferences: {
                            show_default_blocks: false
                        }
                    }
                };
            } else if (paymentOption === PAYMENT_OPTIONS.CREDIT_CARD) {
                options.config = {
                    display: {
                        blocks: {
                            card: {
                                name: "Pay via Cards",
                                instruments: [
                                    {
                                        method: "card",
                                    },
                                ]
                            }
                        },
                        sequence: [
                            "block.card"
                        ],
                        preferences: {
                            show_default_blocks: false
                        }
                    }
                };
            } else if (paymentOption === PAYMENT_OPTIONS.GOOGLE_PAY) {
                options.config = {
                    display: {
                        blocks: {
                            upi: {
                                name: "Pay Via UPI",
                                instruments: [
                                    {
                                        method: "upi",
                                        apps: ["google_pay"],
                                        flows: ["qr", "intent", "collect"]
                                    },
                                ]
                            }
                        },
                        sequence: [
                            "block.upi"
                        ],
                        preferences: {
                            show_default_blocks: false
                        }
                    }
                };
            } else if (paymentOption === PAYMENT_OPTIONS.PAYTM) {
                options.config = {
                    display: {
                        blocks: {
                            wallet: {
                                name: "Pay via Paytm",
                                instruments: [
                                    {
                                        method: "wallet",
                                        // wallets: ["phonepe"]
                                    },
                                ]
                            }
                        },
                        sequence: [
                            "block.wallet"
                        ],
                        preferences: {
                            show_default_blocks: false
                        }
                    }
                };
            }

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.log("Payment failed", error);
        }
    };

    const onOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPaymentOption(e.target.value);
    };

    return (
        <>
            <RazorpayCheckoutWrapper>
                <RazorpayCheckoutItem>
                    <input
                        type="radio"
                        name="payment-option"
                        value={PAYMENT_OPTIONS.GOOGLE_PAY}
                        onChange={onOptionChange}
                    />
                    <img src="/icons/google-pay.svg" width="150" alt="Google Pay" />
                </RazorpayCheckoutItem>
                <RazorpayCheckoutItem>
                    <input
                        type="radio"
                        name="payment-option"
                        value={PAYMENT_OPTIONS.CREDIT_CARD}
                        onChange={onOptionChange}
                    />
                    <img src="/icons/credit-card.svg" width="160" alt="Credit Card" />
                </RazorpayCheckoutItem>
                <RazorpayCheckoutItem>
                    <input
                        type="radio"
                        name="payment-option"
                        value={PAYMENT_OPTIONS.NET_BANKING}
                        onChange={onOptionChange}
                    />
                    <img src="/icons/net-banking.svg" width="150" alt="Net Banking" />
                </RazorpayCheckoutItem>
                <RazorpayCheckoutItem>
                    <input
                        type="radio"
                        name="payment-option"
                        value={PAYMENT_OPTIONS.PAYTM}
                        onChange={onOptionChange}
                    />
                    <img src="/icons/paytm.svg" width="90 " alt="Paytm" />
                </RazorpayCheckoutItem>
            </RazorpayCheckoutWrapper>
            <Spacer direction="horizontal" size={20}/>
            <div>
                <Button size="md" rounded onClick={onContinueClick} disabled={!paymentOption}>
                    Continue <img src="/icons/arrow-forward.svg" alt="Continue" width="15" />
                </Button>
            </div>
        </>
    );
};

export default RazorpayCheckout;