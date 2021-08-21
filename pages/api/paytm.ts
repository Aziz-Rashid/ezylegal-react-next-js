import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import PaytmChecksum from './PaytmChecksum';

type Data = {
    error?: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        if (req.method === 'GET') {
            var paytmParams: any = {};
            const mid = "MTOshh04866525945220";
            const key = "kOCDI!a@b2Whk6ns";
            const orderId = "Order_" + Math.floor(Math.random() * 100000)

            paytmParams.body = {
                "requestType": "Payment",
                "mid": mid,
                "websiteName": "WEBSTAGING",
                "orderId": orderId,
                // "callbackUrl": "https://merchant.com/callback",
                "txnAmount": {
                    "value": "1.00",
                    "currency": "INR",
                },
                "userInfo": {
                    "custId": "CUST_001",
                },
            };

            const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), key);

            paytmParams.head = {
                "signature": checksum
            };

            const result = await axios.post(`https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`, paytmParams);

            if (!result.data.body) throw new Error("Some error occured");

            res.json({ ...result.data, orderId });
        } else {
            res.status(400).json({ error: "Method not allowed" });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export default handler;
