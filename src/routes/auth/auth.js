import express from 'express';
import axios from 'axios';

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
    cst_id: Partner ID --> test
    custKey: Partner Auth Key --> abcd1234567890

Return:
    result: Success
    AuthKey: Access Token value after partner authentication
    ReturnURL: neccessary payple domain url for purchase request after partner authentication.
 */
authRouter.post('/partner', (req, res) => {
    const data = {
        cst_id: req.body.cst_id,
        custKey: req.body.custKey
    }
    axios({
        method: 'post',
        url: process.env.URL,
        data: data
    }).then((axiosRes) => {
        //console.log(axiosRes.data);
        console.log(axiosRes.data.AuthKey);
        console.log(axiosRes.data.return_url);
        //res.cookie("AuthKey", axiosRes.data.AuthKey);
        //res.cookie("payReqURL",axiosRes.data.return_url);
    })
})