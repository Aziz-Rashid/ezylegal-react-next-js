import Link from "next/link";
import { FC } from "react";

import Text from "../../styled/Text";
import { BreadcrumbWrapper } from "./Breadcrumb.styled";

export interface BreadcrumbItem {
    label: string;
    link: string | null;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
    return (
        <BreadcrumbWrapper>
            <ol className="breadcrumb">
                {
                    items.map((item, i) => (
                        item.link
                        ? (
                            <li key={i} className="breadcrumb-item">
                                <Link href={ item.link }>
                                    <Text as="a">{ item.label }</Text>
                                </Link>
                            </li>
                        )
                        : (
                            <li key={i} className="breadcrumb-item active" aria-current="page">
                                <Text inline>{ item.label }</Text>
                            </li>
                        )
                    ))
                }
            </ol>
        </BreadcrumbWrapper>
    );
};

export default Breadcrumb;