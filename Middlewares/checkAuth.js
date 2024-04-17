const jwt = require("jsonwebtoken")

const  checkAuth=(req,res,next)=>{
    const token = req.headers["authorization"].split(" ")[1];
    if(!token || typeof token !== "string"){
        return res.status(403).json({error:"no token provided"})
    }
    jwt.verify(token,process.env.USER_SECRET_KEY,(err,decoded)=>{
        if(err){
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ error: "Token expired" });
            }

            return res.status(403).json({error:"failed to authenticate token.",err})
        }
    next();
    })
}
module.exports = checkAuth