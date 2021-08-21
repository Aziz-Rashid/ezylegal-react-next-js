import { FC } from "react";

import WhyChooseUs from "../../dtos/WhyChooseUs.dto";
import Spacer from "../../styled/Spacer";
import Text from "../../styled/Text";

interface WhyChooseUsBoxProps {
    data: WhyChooseUs[] | null;
};

const WhyChooseUsBox: FC<WhyChooseUsBoxProps> = ({ data }) => {
    if (!data || !data.length) return null;

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6 order-md-1">
                    <img src="/images/why-choose-us.png" alt="why-choose-us" />
                </div>
                <div className="col-12 col-md-6">
                    <Text fontFamily="montserrat" fontSize="xxxl">
                        Why Choose Us
                        </Text>
                    <Spacer direction="vertical" size={20} />
                    <ul className="list-unstyled">
                        {
                            data.map((item, i) => (
                                <li className="media mb-4" key={i}>
                                    {
                                        item.icon
                                            ? <img className="mr-4" src={item.icon?.sourceUrl} alt={item.icon?.title} width="28" />
                                            : null
                                    }
                                    <div className="media-body">
                                        <Text fontSize="lg">{item.title}</Text>
                                        <Text>{item.description}</Text>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUsBox;