const express= require('express');
const dotenv= require('dotenv');
const app= express();
dotenv.config({path: './config.env'});

const conn=require('./db/conn');

// we link the router file
app.use(express.json());
app.use(require('./router/auth'));
const PORT=process.env.PORT;


const middleware= (req,res,next)=>{
    console.log("Hello in the middleware");
    next();
}
app.get('/about',middleware,(req,res)=>{
    res.send("Hello world from about the server")
})
app.get('/contact',(req,res)=>{
    res.send("Hello world from contact the server")
})
app.get('/signin',(req,res)=>{
    res.send("Hello world from signin the server")
})

app.get('/signup',(req,res)=>{
    res.send("Hello world from signup the server")
})

app.listen(PORT,(res)=>{
    console.log(`Now Server is running in port ${PORT}`)
});