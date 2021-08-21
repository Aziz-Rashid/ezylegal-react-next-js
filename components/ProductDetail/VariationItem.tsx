import Link from "next/link";
import { FC } from "react";

import Variation from "../../dtos/Variation.dto";
import Button from "../../styled/Button";
import CrossedText from "../../styled/CrossedText";
import ShadowCard from "../../styled/ShadowCard";
import Spacer from "../../styled/Spacer";
import Text from "../../styled/Text";
import savePercentage from "../../utils/savePercentage";

interface VariationProps {
    variation: Variation
};

const VariationItem: FC<VariationProps> = ({ variation }) => {
    return (
        <div className="col-12 col-md-4 d-flex">
            <ShadowCard backgroundColor="skyBlue" bordered>
                <Text fontSize="lg">{variation.name}</Text>
                {
                    variation.description?.map((item) => (
                        <>
                            {
                                item.toLowerCase().includes('no')
                                ? <img width="20" src="/icons/remove_circle_24px.svg" alt="icon" />
                                : <img width="20" src="/icons/check_circle_24px.svg" alt="icon" />
                            }
                            <Spacer direction="horizontal" size={8} />
                            <Text fontSize="sm" inline>{ item }</Text>
                            <Spacer direction="vertical" size={5} />
                        </>
                    ))
                }
                <Text color="brown" fontSize="xl" inline>&#8377; {variation.salePrice} </Text>
                {
                    variation.regularPrice && (
                        <>
                            <Spacer direction="horizontal" size={8} />
                            <CrossedText inline>&#8377; {variation.regularPrice} /-</CrossedText>
                            <Spacer direction="horizontal" size={8} />
                            <Text inline>{savePercentage(Number(variation.regularPrice), Number(variation.salePrice))}% off </Text>
                        </>
                    )
                }
                <Spacer direction="vertical" size={10} />
                <Link href="/checkout">
                    <Button as="a" size="md" rounded>
                        Buy Service <img src="/icons/arrow-forward.svg" alt="Forward" width="18" />
                    </Button>
                </Link>
            </ShadowCard>
        </div>
    );
};

export default VariationItem;