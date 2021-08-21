import { FC } from "react";

import Product, { ProductTypes } from "../../dtos/Product.dto";
import SimpleProduct from "./SimpleProduct";
import VariableProduct from "./VariableProduct";

interface ProductDetailProps {
    product: Product
};

const ProductDetail: FC<ProductDetailProps> = ({ product }) => {
    switch (product.productTypes) {
        case ProductTypes.Variable:
            return <VariableProduct product={product} />;
        case ProductTypes.Simple:
            return <SimpleProduct product={product} />;
    }
};

export default ProductDetail;