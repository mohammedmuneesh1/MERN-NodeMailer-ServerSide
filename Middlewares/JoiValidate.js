const joiValidate=(joiSchema)=>{
    return async function (req,res,next){
        try {
            const data = await joiSchema.validateAsync(req.body)
            req.body=data;
            next();
        } catch (error) {
            return res.status(400).json({status:"Error",message:error.message})
        }

    }

}
module.exports= joiValidate