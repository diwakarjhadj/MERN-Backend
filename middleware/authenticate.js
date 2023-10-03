const jwt= require('jsonwebtoken');
const User= require('../src/model/userSchema')
const authenticate= async (req,res,next)=>{
    try{
        const token= req.cookies.jwttoken;
        const verifytoken= jwt.verify(token,process.env.SECRET_KEY)
        const validUser= await User.findOne({_id:verifytoken._id,"tokens.token":token});
        if(!validUser)
        {
            throw new Error('User Not Found');
        }
        req.token=token;
        req.validUser=validUser;
        req.userID=validUser._id;
        next();
    }
    catch(err){
        res.status(401).send(`Unauthorized: No token Provided`)
        console.log(err)
    }
}

module.exports=authenticate;