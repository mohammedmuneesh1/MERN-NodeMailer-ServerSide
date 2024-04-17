const express=require("express")
const checkAuth = require("../Middlewares/checkAuth")
const router=express.Router();
const {userRegisterValidation, userLoginValidation} =require("../Validations/joiSchema");
const joiValidate = require("../Middlewares/JoiValidate")
const {userRegistration, userVerify, userLogin, userHome} = require("../Controllers/userController")
const tryCatch = require("../Middlewares/tryCatch")
router.route('/user/register').post(joiValidate(userRegisterValidation),tryCatch(userRegistration));
router.route('/user/login').post(joiValidate(userLoginValidation), tryCatch(userLogin));
router.route('/user/:userId/verify/:token').put(tryCatch(userVerify))
router.route('/user/home').get(checkAuth,tryCatch(userHome))



module.exports = router