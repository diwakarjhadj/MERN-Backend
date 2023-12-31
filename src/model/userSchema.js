const mongoose= require('mongoose');
const bcryptjs= require('bcryptjs');  
const jwt= require('jsonwebtoken')  
const userSchema= new mongoose.Schema({
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    cpassword:{
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

// we are Hashing the password

userSchema.pre('save',async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcryptjs.hash(this.password,12);
        this.cpassword=await bcryptjs.hash(this.password,12);
    }
    next();
})


//  generating Json web token 

userSchema.methods.generateAuthToken= async function(){
    try{
        let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}

const User= mongoose.model('USER',userSchema);

module.exports=User;

