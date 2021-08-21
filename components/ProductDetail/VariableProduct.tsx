import { FC } from "react";

import Product from "../../dtos/Product.dto";
import Spacer from "../../styled/Spacer";
import Text from "../../styled/Text";
import StarRating from "../StarRating";
import VariationItem from "./VariationItem";

interface VariableProductProps {
    product: Product
};

const VariableProduct: FC<VariableProductProps> = ({ product }) => {
    return (
        <>
            <div className="row">
                <div className="col-12 col-md-8">
                    <Text fontSize="xxxl" fontFamily="montserrat">{product.name}</Text>
                    <Spacer direction="vertical" size={10}/>
                    <div className="d-flex align-items-center">
                        <StarRating readonly initialRating={product.averageRating} />
                        <Spacer direction="horizontal" size={8}/>
                        <Text inline fontSize="sm" color="gray">{ product.reviewCount } reviews</Text>
                    </div>
                    <Spacer direction="vertical" size={14}/>
                    <Text fontSize="lg" as="div" dangerouslySetInnerHTML={{ __html: product.description || '' }}></Text>
                </div>
            </div>
            <Spacer direction="vertical" size={15}/>
            {
                product.variations?.length ? (
                    <div className="row">
                        {
                            product.variations?.map(variation => <VariationItem key={variation.id} variation={variation}/>)
                        }
                    </div>
                ) : null
            }
        </>
    );
};

export default VariableProduct;