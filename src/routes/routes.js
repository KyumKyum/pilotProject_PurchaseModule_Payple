import express from 'express';

import {authRouter} from './auth/auth.js'
import {payRouter} from './payment/payCERTReq.js'
import {refundRouter} from './refund/refund.js'
import {testRouter} from './testRedis/testRedis.js'

//Define Router for express server.
export const router = express.Router();

router.get('/',(req,res) => {
    //res.cookie("John","Doe");
    res.send("INDEX\nPresumption: Customer A trying to buy whey protein, which is 50,000");
})

router.use('/auth',authRouter);
router.use('/pay',payRouter);
router.use('/refund', refundRouter);
router.use('/test', testRouter);
