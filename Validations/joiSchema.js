const Joi = require("joi")


   userRegisterValidation = Joi.object({
    name:Joi.string().messages({
        'string.base': 'Name must be a string', // Custom message for invalid string format
        'any.required': 'Name is required', // Custom message for missing required field    
    }).required(),
    age:Joi.number(),
    email:Joi.string().email().required(),
    password:Joi.string().min(8).max(20).required(),
 })

 const userLoginValidation = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(8).max(20).required()
 })
 
 module.exports = {
    userRegisterValidation,
    userLoginValidation
}