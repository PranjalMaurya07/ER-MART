require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const { connectMongoDB } = require('./config/connection');
const app = express();

const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const productRouter = require('./routes/productRouter');

connectMongoDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(morgan('dev'));

app.use('/',userRouter);
app.use('/',categoryRouter);
app.use('/',productRouter);

const port = process.env.PORT || 8001;
app.listen(port,()=>{
    console.log(`Server running in ${process.env.DEV_MODE} mode on port ${port}`);
});
