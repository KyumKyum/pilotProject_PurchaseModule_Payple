import express from 'express';
import axios from 'axios';
import {redisClient} from '../../cacheDB.js'

export const authRouter = express.Router();

authRouter.get('/', (req,res) => {
    const data = {
        customer_no: 1,
        customer_name: 'kyum',
        buying_goods: 'Whey_Protein',
        purchasing_price: '50,000KRW',
        oid: Date.now()
    }

    res.send(data);
})

//Testing Function: Authentication to Partner Server. 
/*
POST /partner, Get Partner Authentication
Params:
    cst_id: Partner ID --> test
    custKey: Partner Auth Key --> abcd1234567890

Return:
    result: Success
    AuthKey: Access Token value after partner authentication
    ReturnURL: neccessary payple domain url for purchase request after partner authentication.
 */
authRouter.post('/partner', async (req, res) => {

    const headers = {
        'content-type': 'application/json',
        'referer' : process.env.PCD_HTTP_REFERER
    }
    const body = {
        cst_id: req.body.cst_id,
        custKey: req.body.custKey,
        PCD_PAYCANCEL_FLAG: req.body.payCancel || ''
    }

    try {

        await redisClient.connect();

        const resultData = await axios.post(
            process.env.AUTH_URL,
            body,
            headers
        )
    
        console.log(resultData.data.result_msg);

        const receivedData = {
            authKey: resultData.data.AuthKey,
            returnURL: resultData.data.return_url
        }

        redisClient.set('AUTH',JSON.stringify(receivedData));
    } catch (e){
        console.log("Error: " + e.message);
    }


    await redisClient.quit();
    //Log retrieved auth data
    //const redisData = await redisClient.get('AUTH');
    //console.log("REDIS: " + redisData);
})