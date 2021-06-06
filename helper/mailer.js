const nodemailer = require("nodemailer");
const key = require("./keys");
//let testAccount = await nodemailer.createTestAccount();
console.log({
  user: key.google.email, // generated ethereal user
  pass: key.google.password, // generated ethereal password
  env: process.env,
});
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "pixicrminbound@gmail.com", // generated ethereal user
    pass: "pixicrminboundpixicrminbound", // generated ethereal password
  },
});



module.exports = transporter;