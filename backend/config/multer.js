const path=require("path");

const multer=require("multer");
const {v4}=require("uuid")
 
var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"assets/pics/");
    },
    filename:(req,file,cb)=>{
        let fileName=v4()+path.extname(file.originalname);
        req.fileName=fileName;
        cb(null,fileName);
    },

});
const upload=multer({
    storage,
    limits:{
        fileSize:1*1024*1024
    },
    fileFilter:(req,file,cb)=>{
        let extension=path.extname(file.originalname);
        cb(null,true);
        // if(extension==".jpg"){
        //     cb(null,true);
        // }else{
        //     cb(new Error("File format not accepted"));
        // }
    },

});
module.exports={upload}