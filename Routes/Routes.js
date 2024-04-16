const express=require("express")
const router=express.Router();
const {userRegistration, userVerify, userLogin} = require("../Controllers/userController")
const tryCatch = require("../Middlewares/tryCatch")
router.route('/user/register').post(tryCatch(userRegistration));
router.route('/user/login').post(tryCatch(userLogin));
router.route('/user/:userId/verify/:token').put(tryCatch(userVerify))


module.exports = router