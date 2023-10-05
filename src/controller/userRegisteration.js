const jwt= require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User= require('../model/userSchema');

const register=async (req, res) => {
    const { email, password, cpassword } = req.body;
    if (!email || !password || !cpassword) {
        return res.status(422).json({ error: "please fill the Field Properly" })
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email Already Exist" });
        }

        const user = new User({ email, password, cpassword });

        await user.save();
        res.status(201).json({ message: "user Registered Successfull" });

    } catch (err) {
        console.log(err);
    }
}

const login=async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please Fill email or Password" })
        }

        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            const token=  await userLogin.generateAuthToken();
            res.cookie("jwttoken",token,{
                expires: new Date(Date.now()+25892000000),
                httpOnly:true
            })
            if (!isMatch) {
                res.status(400).json({ error: "user error" })
            }
            else {

                res.json({ message: "user signin Successfully" })
            }
        }
        else {
            res.json({ message: "Invalid Login Id or Password" })
        }
    } catch (err) {
        console.log(err);
    }
}
module.exports={register,login};