var jwt = require('jsonwebtoken');
function verify(req,res,next){
    let headerToken=req.get("Authorization") || "";
    let token =jwt.verify(headerToken.split(" ")[1],process.env.JWT_SECRET);
    if(token){
        req.user=token
        next()
    }else{
        next(new Error("Token Invalid"))
    }
}
module.exports=verify;
