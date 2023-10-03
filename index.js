const express= require('express');
const dotenv= require('dotenv');
const app= express();
dotenv.config({path: './config.env'});

const conn=require('./db/conn');

// we link the router file
app.use(express.json());
app.use(require('./router/routes'));
const PORT=process.env.PORT;

app.listen(PORT,(res)=>{
    console.log(`Now Server is running in port ${PORT}`)
});
// This is Ending Line