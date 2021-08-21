import React from "react";
import { FC } from "react";
import Text from "../../styled/Text";

import { QuoteContainer } from './JoinNetworkQuotes.styled';

interface JoinNetworkQuotesProps {
    quotes: Array<Quote>;
}
interface Quote {
    title: string;
    description: string;
}

const JoinNetworkQuotes: FC<JoinNetworkQuotesProps> = ({ quotes }) => {
    return (
        <div className="row container m-auto">
            {quotes.map((quote) => (
                <div className="col-md-4">
                    <QuoteContainer>
                        <Text fontSize="lg" color="white" weight="bold" className="mb-3">
                            {quote.title}
                        </Text>
                        <Text fontSize="sm" weight="normal" color="white">
                            {quote.description}
                        </Text>
                    </QuoteContainer>
                </div>
            ))}
        </div>
    );
};

export default JoinNetworkQuotes;
