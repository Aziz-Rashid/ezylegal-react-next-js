import Link from "next/link";
import { FC, useState } from "react";

import Category from "../../dtos/Category.dto";
import Button from "../../styled/Button";
import Spacer from "../../styled/Spacer";
import Text from "../../styled/Text";
import { BusinessOfferingsWrapper } from "./BusinessOfferingsBox.styled";
import TellUsPopup from "../TellUsPopup";

interface BusinessOfferingsBoxProps {
    categories: Category[] | null;
};

const BusinessOfferingsBox: FC<BusinessOfferingsBoxProps> = ({ categories }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (!categories || !categories.length) return null;

    return (
        <BusinessOfferingsWrapper>
            <div className="container">
                <Text fontSize="xxxl" fontFamily="montserrat">All business offerings</Text>
                <Spacer direction="vertical" size={20} />
                <div className="row">
                    {
                        categories.map((category) => (
                            <div key={category.id} className="col-12 col-md-4">
                                <Text fontSize="xl">{category.name}</Text>
                                <Spacer direction="vertical" size={15} />
                                {
                                    category.products.map(product => (
                                        <Link key={product.id} href={`/category/${category.slug}/product/${product.slug}`}>
                                            <Button color="black" backgroundColor="skyBlue" size="sm" as="a" className="mb-3 mr-3" rounded>{product.name}</Button>
                                        </Link>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
                <Spacer direction="vertical" size={30} />
                <Text fontSize="lg">If you are not able to Find what you are looking for then <Text as="a" color="primary" fontSize="lg" onClick={handleShow}>Let us Know</Text></Text>
            </div>
            <TellUsPopup show={show} onHide={handleClose} size="lg"/>
        </BusinessOfferingsWrapper>
    );
};

export default BusinessOfferingsBox;