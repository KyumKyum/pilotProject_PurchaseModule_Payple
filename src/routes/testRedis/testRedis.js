import express from 'express';
import axios from 'axios';
import {redisClient} from '../../cacheDB.js'

export const testRouter = express.Router();

testRouter.get('/', async (req,res) => {

    await redisClient.connect();


    let authVal = await redisClient.get('AUTH');
    authVal = JSON.parse(authVal);

    console.log("[TEST] AUTHKEY: " + authVal.authKey);
    console.log("[TEST] RETURN URL: " + authVal.returnURL);

    res.json({
        "result":"ok"
    })

    await redisClient.quit();
})