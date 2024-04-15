const { register } = require("module");
const userCollection = require("../Models/user");
const bcrypt = require("bcrypt");
const tokenCollection = require("../Models/verifyToken")
const crypto = require("crypto")
const sendMail = require("../helpers/sendMail")



async function userRegistration(req, res) {
  try {
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
  } catch (error) { 
    return res.status(500).json({status: "failure",message: "error occured while registering new user",error: error.message});
  }
}

async function userVerify(req, res) {}

async function userLogin(req, res) {}
module.exports = {
  userRegistration,
};
