const express = require('express')
const router = express.Router();
const authenticate= require('../middleware/authenticate');
const {register,login}=require('../src/controller/userRegisteration');

router.get('/', (req, res) => {
    res.send('Hello world from the router server');
})
// creating signup page

router.post('/signup', register);

// Creating signin page


router.post('/signin', login);


router.get('/about',authenticate,(req,res)=>{
    res.send("Hello world from about the server")
    res.send(req.validUser);
})
module.exports = router;
