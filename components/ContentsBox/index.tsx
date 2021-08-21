import { FC } from "react";

import Contents from "../../dtos/Contents.dto";
import Spacer from "../../styled/Spacer";
import Text from "../../styled/Text";

interface ContentsBoxProps {
    data: Contents;
}

const ContentsBox: FC<ContentsBoxProps> = ({ data }) => {
    if (!data || !data?.content?.length) return null;

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-7">
                    {
                        data.heading 
                        ? <Text fontSize="xxxl" fontFamily="montserrat">{ data.heading }</Text>
                        : null
                    }
                    <Spacer direction="vertical" size={20} />
                    <ul className="list-unstyled">
                        {
                            data.content.map((item, i) => (
                                <li className="media mb-4" key={i}>
                                    {
                                        item.icon
                                            ? <img className="mr-4" src={item.icon?.sourceUrl} alt={item.icon?.title} width="36" />
                                            : null
                                    }
                                    <div className="media-body">
                                        <Text fontSize="lg" weight="bold">{item.title}</Text>
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

export default ContentsBox;