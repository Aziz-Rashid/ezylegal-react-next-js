import { sumBy } from "lodash";
import { FC, useEffect, useMemo, useState } from "react";
import { useDispatch } from 'react-redux';

import Product from "../../../dtos/Product.dto";
import Upsell from "../../../dtos/Upsell.dto";
import { addItems } from "../../../redux/cart/cart.actions";
import Button from "../../../styled/Button";
import CrossedText from "../../../styled/CrossedText";
import Divider from "../../../styled/Divider";
import Spacer from "../../../styled/Spacer";
import Text from "../../../styled/Text";
import savePercentage from "../../../utils/savePercentage";
import CheckBox from "../../CheckBox";
import AddonItem from "./AddonItem";
import { AddonBoxWrapper } from "./SimpleProduct.styled";

interface AddonBoxProps {
    product: Product;
};

const AddonBox: FC<AddonBoxProps> = ({ product }) => {
    const [selected, setSelected] = useState<Array<Upsell>>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setSelected([product as Upsell]);
    }, []);

    const prices = useMemo(() => {
        return {
            totalRegularPrice: sumBy(selected, (o) => Number(o.regularPrice)),
            totalSalePrice: sumBy(selected, (o) => Number(o.salePrice))
        };
    }, [selected]);

    const totalSaving = useMemo(() => {
        return {
            totalSaving: prices.totalRegularPrice - prices.totalSalePrice,
            totalSavingPer: savePercentage(prices.totalRegularPrice, prices.totalSalePrice)
        };
    }, [prices]);

    const onBuyClick = () => {
        dispatch(addItems(selected));
    };

    return (
        <AddonBoxWrapper>
            <div>
                <CheckBox name={product.name} checked readOnly>
                    <Spacer direction="horizontal" size={12} />
                    <Text inline>{product.name}</Text>
                    <Spacer direction="horizontal" size={12} />
                    <Text fontSize="sm" inline>&#8377; {product.salePrice} /- </Text>
                </CheckBox>
                {
                    product.regularPrice && (
                        <>
                            <Spacer direction="horizontal" size={12} />
                            <CrossedText fontSize="sm" inline>&#8377; {product.regularPrice} /-</CrossedText>
                            <Spacer direction="horizontal" size={12} />
                            <Text fontSize="sm" inline>{savePercentage(Number(product.regularPrice), Number(product.salePrice))}% off </Text>
                        </>
                    )
                }
            </div>
            {
                product.upsell?.length 
                ? (
                    <>
                        <Divider margin="15px" color="black" />
                        <Text fontSize="sm" weight="bold">Additional services at attractive discount</Text>
                        <Spacer direction="vertical" size={15} />
                        {
                            product.upsell?.map(addon => <AddonItem key={addon.id} addon={addon} selected={selected} setSelected={setSelected} />)
                        }
                    </>
                ) 
                : null
            }
            
            <Spacer direction="vertical" size={20} />
            <Text weight="bold" inline>Total Price</Text>
            <Spacer direction="horizontal" size={12} />
            <Text weight="bold" color="brown" fontSize="xl" inline>&#8377; {prices.totalSalePrice}/-</Text>
            {
                totalSaving.totalSaving ? (
                    <>
                        <Spacer direction="horizontal" size={12} />
                        <Text color="gray" inline>Total Saving &#8377;{totalSaving.totalSaving}/- ({totalSaving.totalSavingPer}% off)</Text>
                    </>
                ) : null
            }
            <Spacer direction="vertical" size={20} />
            <Button as="a" size="md" rounded onClick={onBuyClick}>
                Buy Service <img src="/icons/arrow-forward.svg" alt="Forward" width="18" />
            </Button>
        </AddonBoxWrapper>
    );
};

export default AddonBox;