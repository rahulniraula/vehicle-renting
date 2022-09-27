const bcrypt = require("bcrypt")
const brands = require("./data/car_brands.json");
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

function validatePassword(password) {
    return password.length > 6;
}
async function encryptPassword(password) {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
}
async function validPassword(password, encPassword) {
    return await bcrypt.compare(password, encPassword);
}
function successResponse(data) {
    return { status: 1, data }
}
function errorResponse(message) {
    return { status: 0, message }
}
function vehicleTypes() {
    return ["Car", "Bus", "Jeep"];
}
function carBrands() {
    return brands;
}
function transmissionTypes() {
    return ["Automatic", "Manual", "Hybrid"];
}
function sanitizeObject(obj, ...except) {
    let o = {};
    for (let k in obj) {
        if (except.indexOf(k) == -1 && obj[k]) {
            o[k] = obj[k]
        }

    }
    return o;
}
function uploadToS3(file) {
    // Set the region 
    AWS.config.update({ region: process.env.AWS_REGION });

    // Create S3 service object
    var s3 = new AWS.S3({ apiVersion: '2006-03-01' });

    // call S3 to retrieve upload file to specified bucket
    var uploadParams = { Bucket: process.env.AWS_BUCKET, Key: '', Body: '' };

    // Configure the file stream and obtain the upload parameters
    var fs = require('fs');
    var fileStream = fs.createReadStream(file);
    fileStream.on('error', function (err) {
        console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    var path = require('path');
    uploadParams.Key = path.basename(file);

    return new Promise((resolve, reject) => {
        // call S3 to retrieve upload file to specified bucket
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                // console.log("Error", err);
                reject(err);
            } if (data) {
                // console.log("Upload Success", data.Location);
                resolve(data);
            }
        });
    });

}
module.exports = { validatePassword, validateEmail, encryptPassword, validPassword, 
    successResponse, errorResponse, vehicleTypes, carBrands, transmissionTypes, sanitizeObject,uploadToS3 }