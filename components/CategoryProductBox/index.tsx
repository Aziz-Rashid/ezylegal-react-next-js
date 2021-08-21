import Link from "next/link";
import { FC } from "react";

import Category from "../../dtos/Category.dto";
import Product from "../../dtos/Product.dto";
import CrossedText from "../../styled/CrossedText";
import ShadowCard from "../../styled/ShadowCard";
import Spacer from "../../styled/Spacer";
import Text from "../../styled/Text";
import { ShortDescription } from "./CategoryProductBox.styled";

interface CategoryProductBoxProps {
    product: Product;
    category: Category;
}

const CategoryProductBox:FC<CategoryProductBoxProps> = ({ product, category }) => {
    return (
        <div className="col-12 col-md-4 d-flex">
            <ShadowCard className="w-100">
                <Text fontSize="lg" weight="semibold">{product.name}</Text>
                <ShortDescription as="div" fontSize="sm" dangerouslySetInnerHTML={{ __html: product.shortDescription }}/>
                <Text inline>&#8377; {product.salePrice} </Text>
                <Spacer direction="horizontal" size={8} />
                <CrossedText inline>&#8377; {product.regularPrice} </CrossedText>
                <Link href={`/category/${category.slug}/product/${product.slug}`}>
                    <Text block fontSize="sm" as="a" color="primary">Learn More</Text>
                </Link>
            </ShadowCard>
        </div>
    )
};

export default CategoryProductBox;