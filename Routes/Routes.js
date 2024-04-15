const express=require("express")
const router=express.Router();
const {userRegistration} = require("../Controllers/userController")
router.route('/user/register').post(userRegistration);
router.route('/user/login').post(userRegistration);


module.exports = router