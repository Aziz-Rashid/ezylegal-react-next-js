import { FC, useState } from "react";

import Product from "../../../dtos/Product.dto";
import Spacer from "../../../styled/Spacer";
import Text from "../../../styled/Text";
import StarRating from "../../StarRating";
import AddonBox from "./AddonBox";

interface SimpleProductProps {
    product: Product;
};

const SimpleProduct: FC<SimpleProductProps> = ({ product }) => {
    return (
        <div className="row">
            <div className="col-12 col-md-7">
                <Text fontSize="xxxl" fontFamily="montserrat">{product.name}</Text>
                <Spacer direction="vertical" size={10} />
                <div className="d-flex align-items-center">
                    <StarRating readonly initialRating={product.averageRating} />
                    <Spacer direction="horizontal" size={8} />
                    <Text inline fontSize="sm" color="gray">{product.reviewCount} reviews</Text>
                </div>
                <Spacer direction="vertical" size={14} />
                <Text fontSize="lg" as="div" dangerouslySetInnerHTML={{ __html: product.description || '' }}></Text>
                <Spacer direction="vertical" size={10} />
            </div>
            <div className="col-12 col-md-5">
                <AddonBox product={product} />
            </div>
        </div>
    );
};

export default SimpleProduct;