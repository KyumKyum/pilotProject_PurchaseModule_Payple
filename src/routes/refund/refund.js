import express from 'express';
import axios from 'axios';
import {redisClient} from '../../cacheDB.js';

export const refundRouter = express.Router();

/*
POST /refundReq, Request Refund
Params: 
    PCD_CST_ID: Partner ID --> test
    PCD_CUST_KEY: Partner Auth Key --> abcd1234567890
    PCD_AUTH_KEY: Auth key retrieved from purchase request
*/

refundRouter.post('/refundReq', async (req,res) => {
    
    //console.log("REFUND\n\n")
    await redisClient.connect();
    let authVal = await redisClient.get('AUTH');
    authVal = JSON.parse(authVal);
    //console.log("PARSED\n\n")
    
    const header = {
        'content-type' : 'application/json',
        'referer': process.env.PCD_HTTP_REFERER
    }

    const body = {
        PCD_CST_ID: req.body.cst_id,
        PCD_CUST_KEY: req.body.custKey,
        PCD_AUTH_KEY: authVal.authKey,
        PCD_REFUND_KEY: process.env.PCD_REFUND_KEY,
        PCD_PAYCANCEL_FLAG:'Y',
        PCD_PAY_OID:'test12413135',
        PCD_PAY_DATE:20220925,
        PCD_REFUND_TOTAL:50000
    }

    try{
        const resulData = await axios.post(
            authVal.returnURL,
            body,
            header
        )

        console.log(resulData.data);
    } catch(e){
        console.log("ERROR: " +e.message);
    }

    await redisClient.quit();
})