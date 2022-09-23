const express=require("express");
const router=express.Router();
const {getUsers,createUser,getUserById,updateUser,deleteUser}=require("../controller/userController");

router.get('/',getUsers);
router.post('/',createUser);
router.get('/:user_id',getUserById);
router.patch("/:user_id",updateUser);
router.delete("/:user_id",deleteUser);

module.exports=router;