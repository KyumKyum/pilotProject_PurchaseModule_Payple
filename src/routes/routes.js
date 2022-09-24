import express from 'express';
import axios from 'axios';
import {authRouter} from './auth/auth.js'

const {post}  = axios;

//Define Router for express server.
export const router = express.Router();

router.get('/',(req,res) => {
    res.cookie("John","Doe");
    res.send("INDEX\nPresumption: Customer A trying to buy whey protein, which is 50,000");
})

router.use('/auth',authRouter);