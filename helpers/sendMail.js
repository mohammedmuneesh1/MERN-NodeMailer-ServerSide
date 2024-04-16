const nodeMailer = require("nodemailer")
async function sendMail(userEmail,verificationUrl){
    const mailer = nodeMailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.NODEMAILER_EMAIL,
            pass:process.env.NODEMAILER_PASS,
        },
    });

   const mailData= await mailer.sendMail({
        from:"mohammedmuneesh1@gmail.com",
        to:userEmail,
        subject:`Verify MERN NodeMailer User Account.`,
        text:`this is the verify email.${verificationUrl}`
    })
    return mailData;


}

module.exports = sendMail;
