import express from 'express';
import path from 'path'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import {router} from './routes/routes.js';

const app = express(); //create express application

app.set('port', 4000); //set port to 4000

//set details of middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//route to node endpoint - RESTAPI
app.get('/', (req,res) => {
    res.redirect('/node');
})

app.use('/node', router);

//open and listen port

app.listen(app.get('port'), () => {
    console.log("🎈 Testing Server Started on http://localhost:4000 🎈");
})