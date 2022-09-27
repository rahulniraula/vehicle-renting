const bcrypt=require("bcrypt")
const brands=require("./data/car_brands.json");
function validateEmail(email){
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

function validatePassword(password){
    return password.length>6;
}
async function encryptPassword(password){
    const hashed= await bcrypt.hash(password,10);
    return hashed;
}
async function validPassword(password,encPassword){
    return await bcrypt.compare(password,encPassword);
}
function successResponse(data){
    return {status:1,data}
}
function errorResponse(message){
    return {status:0,message}
}
function vehicleTypes(){
    return ["Car","Bus","Jeep"];
}
function carBrands(){
    return brands;
}
function transmissionTypes(){
    return ["Automatic","Manual","Hybrid"];
}
function sanitizeObject(obj){
    let o={};
    for(let k in obj){
        if(obj[k]){
            o[k]=obj[k]
        }

    }
    return o;
}
module.exports={validatePassword,validateEmail,encryptPassword,validPassword,successResponse,errorResponse,vehicleTypes,carBrands,transmissionTypes,sanitizeObject}