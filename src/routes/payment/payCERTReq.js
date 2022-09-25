import express from 'express';
import axios from 'axios';

export const payRouter = express.Router();

/*
POST /payCERTReq, Final Pay check to Payple server 
Params:
    PCD_CST_ID: Partner ID --> test
    PCD_CUST_KEY: Partner Auth Key --> abcd1234567890
    PCD_PAYER_ID: Billing KEY
    PCD_AUTH_KEY: Auth key retrieved from purchase request
    PCD_PAY_REQKEY: Request key retrived from purchase request
 */
payRouter.post('/payCERTReq', async (req, res) => {
    const header = {
        'content-type' : 'application/json',
        'referer': process.env.PCD_HTTP_REFERER
    }

    const body = {
        PCD_CST_ID: req.body.cst_id,
        PCD_CUST_KEY: req.body.custKey,
        PCD_AUTH_KEY: req.body.authkey,
        PCD_PAY_REQKEY: req.body.reqkey,
        PCD_PAYER_ID: req.body.billingkey
    }

    try{
        const resultData = await axios.post(
            process.env.CERT_URL,
            body,
            header
        )

        console.log(resultData.data);
    } catch (e){
        console.log("Error: " + e.message);
    }
})