const express = require('express')
const router = express.Router();
const bcrypt= require('bcryptjs')
const User = require('../model/userSchema')
router.get('/', (req, res) => {
    res.send('Hello world from the router server');
})

// router.post('/register',(req,res)=>{
//     const {name,email,password,cpassword,phone,work}= req.body;
//     if(!name||!email||!password||!cpassword||!phone|| !work)
//     {
//         res.status(422).json({error: "please fill the Field Properly"})
//     }
//     User.findOne({email: email}).then(
//         (userExist)=>{
//             if(userExist){
//                 return res.status(422).json({error: "Email Already Exist"});
//             }
//             const user= new User({name,email,password,cpassword,phone,work});
//             user.save().then(()=>{
//                 res.status(201).json({message: "user Registered Successfull"});
//             }).catch((err)=>res.status(500).json({error: "Falied  to register",err}));
//         }).catch(err=>{console.log(err);})
// });




router.post('/register', async (req, res) => {
    const { name, email, password, cpassword, phone, work } = req.body;
    if (!name || !email || !password || !cpassword || !phone || !work) {
        return res.status(422).json({ error: "please fill the Field Properly" })
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email Already Exist" });
        }

        const user = new User({ name, email, password, cpassword, phone, work });

        await user.save();
        res.status(201).json({ message: "user Registered Successfull" });

    } catch (err) {
        console.log(err);
    }
});
router.post('/signin', async(req,res)=>{
    try{
        const {email, password}= req.body;
        if(!email||!password)
        {
            return res.status(400).json({error: "Please Fill all the details"})
        }

        const userLogin= await User.findOne({email: email});
        if(userLogin)
        {
            const isMatch= await bcrypt.compare(password,userLogin.password)
            if(!isMatch)
        {
            res.status(400).json({error:  "user error"})
        }
        else{

            res.json({message: "user signin Successfully"})
        }
        }
        else{
            res.json({message: "Invalid Login Id or Password"})
        }
    } catch(err){
        console.log(err)
    }
})


module.exports = router;