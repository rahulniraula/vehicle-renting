const { User } = require("../model/userModel");
var jwt = require('jsonwebtoken');
const { validPassword } = require("../util");

async function login(email,password){
    const user=await User.findOne({email:email});
    if(!user){
        throw new Error("No User found");
    }
    if(validPassword(password,user.password)){
        let token=jwt.sign(user.toObject(),process.env.JWT_SECRET);
        return {token};
    }
}
module.exports={login};