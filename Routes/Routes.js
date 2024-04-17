const express=require("express")
const checkAuth = require("../Middlewares/checkAuth")
const router=express.Router();
const {userRegistration, userVerify, userLogin, userHome} = require("../Controllers/userController")
const tryCatch = require("../Middlewares/tryCatch")
router.route('/user/register').post(tryCatch(userRegistration));
router.route('/user/login').post( tryCatch(userLogin));
router.route('/user/:userId/verify/:token').put(tryCatch(userVerify))
router.route('/user/home').get(checkAuth,tryCatch(userHome))



module.exports = router