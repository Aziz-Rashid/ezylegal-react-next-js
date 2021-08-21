import { FC } from 'react';

import Text from '../../styled/Text';
import Spacer from '../../styled/Spacer';
import CrossedText from '../../styled/CrossedText';
import savePercentage from '../../utils/savePercentage';
import { PaymentSummaryWrapper, StyledDivider } from './PaymentSummaryBox.styled';

interface TotalSaving {
    totalSaving: number | null;
    totalSavingPer: number | null;
};

interface PaymentSummaryBoxProps {
    items: Array<any>;
    totalSaving: TotalSaving;
    subTotal: number | null;
    taxTotal: number | null;
    totalPrice: number | null;
};

const PaymentSummaryBox:FC<PaymentSummaryBoxProps> = ({ items, totalSaving, subTotal, taxTotal, totalPrice }) => {
    return (
        <>
            <PaymentSummaryWrapper>
                <Text fontSize="lg">Payment Summary</Text>
                <Spacer direction="vertical" size={20} />
                {
                    items.map((item: any) => {
                        return (
                            <div key={item.id} className="row">
                                <div className="col">
                                    <Text color="secondry">{item.name}</Text>
                                </div>
                                <div className="col text-right">
                                    <Text color="secondry">&#8377; {item.salePrice}</Text>
                                    {
                                        item.regularPrice && (
                                            <>
                                                <Spacer direction="vertical" size={5} />
                                                <CrossedText fontSize="xs" inline>&#8377; {item.regularPrice} /-</CrossedText>
                                                <Spacer direction="horizontal" size={8} />
                                                <Text color="gray" fontSize="xs" inline> ({savePercentage(Number(item.regularPrice), Number(item.salePrice))}% off) </Text>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        );
                    })
                }
                <Spacer direction="vertical" size={25} />
                {
                    subTotal ? (
                        <div className="row">
                            <div className="col">
                                <Text color="secondry2">Sub Total</Text>
                            </div>
                            <div className="col text-right">
                                <Text color="secondry2">&#8377; { subTotal }</Text>
                            </div>
                        </div>
                    ) : null
                }
                {
                    taxTotal ? (
                        <div className="row">
                            <div className="col">
                                <Text color="secondry2">Tax Total</Text>
                            </div>
                            <div className="col text-right">
                                <Text color="secondry2">&#8377; { taxTotal }</Text>
                            </div>
                        </div>
                    ) : null
                }
                {
                    totalSaving.totalSaving ? (
                        <div className="row">
                            <div className="col">
                                <Text color="secondry2">Total Saving</Text>
                            </div>
                            <div className="col text-right">
                                <Text color="secondry2">&#8377;{totalSaving.totalSaving}/- ({totalSaving.totalSavingPer}% off)</Text>
                            </div>
                        </div>
                    ) : null
                }
                <StyledDivider margin="15px" />
                {
                    totalPrice ? (
                        <div className="row">
                            <div className="col">
                                <Text>Total Price</Text>
                            </div>
                            <div className="col text-right">
                                <Text fontSize="xl" color="brown" weight="bold">&#8377;{totalPrice}/-</Text>
                            </div>
                        </div>
                    ) : null
                }
            </PaymentSummaryWrapper>
            <Spacer direction="vertical" size={22} />
            <div className="text-center">
                <Text fontSize="sm" weight="bold">PAYMENTS ARE SECURED WITH</Text>
                <Spacer direction="vertical" size={15} />
                <div className="d-flex align-items-center justify-content-center">
                    <img src="/images/g-pay.png" alt="GPay" height="35" />
                    <Spacer direction="horizontal" size={15}/>
                    <img src="/images/verified-visa.png" alt="Visa" height="35"/>
                    <Spacer direction="horizontal" size={15} />
                    <img src="/images/mastercard.png" alt="Mastercard" height="35"/>
                    <Spacer direction="horizontal" size={15} />
                    <img src="/images/paytm.png" alt="Paytm" height="35"/>
                </div>
            </div>
        </>
    );
};

export default PaymentSummaryBox;