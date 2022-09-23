const mongoose = require("../config/mongooseConfig");
const { validateEmail } = require("../util");
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:[true,"This email is already taken. Please choose a different one"],
        validate:{
            validator:validateEmail,
            message:'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: true,
    },
});
module.exports.User=mongoose.model("User",userSchema);
