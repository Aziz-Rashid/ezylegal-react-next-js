import Link from "next/link";
import { FC } from "react";

import Product from "../../dtos/Product.dto";
import CrossedText from "../../styled/CrossedText";
import Spacer from "../../styled/Spacer";
import Text from "../../styled/Text";
import { ShortDescription } from "./RelatedProductBox.styled";

interface RelatedProductBoxProps {
    data: Product[];
};

const RelatedProductBox: FC<RelatedProductBoxProps> = ({ data }) => {
    if (!data || !data.length) return null;

    return (
        <div className="container">
            <Text fontFamily="montserrat" fontSize="xxxl" >Related Services</Text>
            <Spacer direction="vertical" size={20} />
            <div className="row">
                {
                    data.map((product) => (
                        <div key={product.id} className="col-12 col-md-4 d-flex">
                            <div style={{ backgroundColor: '#fff', padding: '20px', width: '100%' }}>
                                <Text fontSize="lg">{product.name}</Text>
                                <Spacer direction="vertical" size={8} />
                                <ShortDescription as="div" fontSize="sm" dangerouslySetInnerHTML={{ __html: product.shortDescription }} />
                                <Spacer direction="vertical" size={8} />
                                <Text inline>&#8377; {product.salePrice} /- </Text>
                                {
                                    product.regularPrice && (
                                        <>
                                            <Spacer direction="horizontal" size={8} />
                                            <CrossedText inline>&#8377; {product.regularPrice} /-</CrossedText>
                                        </>
                                    )
                                }
                                <Spacer direction="vertical" size={8} />
                                <Link href={`/category/${product.category?.slug}/product/${product.slug}`}>
                                    <Text block fontSize="sm" as="a" color="primary">Learn More</Text>
                                </Link>
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    );
};

export default RelatedProductBox;