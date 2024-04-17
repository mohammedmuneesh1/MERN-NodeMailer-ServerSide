const { register } = require("module");
const userCollection = require("../Models/user");
const bcrypt = require("bcrypt");
const tokenCollection = require("../Models/verifyToken")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const sendMail = require("../helpers/sendMail")


//=====================================USER REGISTRATION=============================================================
async function userRegistration(req, res) {

    let obj = req.body;
    const isUserAlreadyExist = await userCollection.findOne({ email: obj.email }).select("email -_id");
    if (isUserAlreadyExist) {
      return res.status(409).json({ status: "failure", message: "user already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    obj.password = await bcrypt.hash(obj.password, salt);
   const userData =  await userCollection.create(obj);
   const userId = userData._id.toString();
   const tokenInfo = await tokenCollection.create({ userId,token:crypto.randomBytes(32).toString("hex")});
   const url = `${process.env.DB_URL}/users/${tokenInfo.userId}/verify/${tokenInfo.token}`;
    await sendMail(userData.email,url);
    return res.status(201).json({ status: "success", message: "user created successfully." });
}

//==========================================USER VERIFICATION==============================================================
async function userVerify(req, res) {
  const {userId,token} = req.params;
  const validate = await tokenCollection.findOne({userId,token});
  if(validate){
    const timeDifference = (new Date() - validate.createdAt) / (1000 * 60);
    if(timeDifference>10){
       await tokenCollection.deleteOne({userId,token})
       return res.status(410).json({status:"Failure",message:'This link has been expired.login again for verification email.'})
    }
    await userCollection.findByIdAndUpdate(userId, { $set: { isVerified: true } });
    await tokenCollection.deleteOne({userId,token})
    return res.status(200).json({status:"Success",messsage:"Verification has been Successfull"})
  }
  return res.status(400).json({status:"Failure",message:'Invalid URL. try again'})
}

//=================================USER LOGIN=============================================================================
async function userLogin(req, res) {
  const {email,password} = req.body;
  const user = await userCollection.findOne({email})
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(404).json({ status: "Failure", message: "Email/Password is Invalid" });
  }
  if(!user.isVerified){
    const tokenInfo = await tokenCollection.findOne({ userId: user._id }) || await tokenCollection.create({ userId: user._id, token: crypto.randomBytes(32).toString("hex") });
    const url = `${process.env.DB_URL}/users/${user._id}/verify/${tokenInfo.token}`;
    await sendMail(email, url);
    return res.status(201).json({ status: "Success", message: "Verification Mail has been sent to your account. Please verify your account" });
  }
  const token = jwt.sign({userId:user._id}, process.env.USER_SECRET_KEY, { expiresIn: '7d' });

  return res.status(200).json({status:"Success",message:"user login successfully.",token})
}

async function userHome (req,res){
  return res.status(200).json({status:"Success",message:"welcome home."})
}



module.exports = {
  userRegistration,
  userVerify,
  userLogin,
  userHome
};
