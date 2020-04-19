const nodemailer = require('nodemailer');
const keys = require("../config/keys");

let mailerConfig = {
    service:'gmail',
    secure:false,
    auth: {
      user: keys.emailUserName,
      pass: keys.emailPassword
    },tls: {
      rejectUnauthorized: false
    }
  };

const Mail = nodemailer.createTransport(mailerConfig);

Mail.sendEMail = function (mailOptions) {
  return new Promise(function (resolve, reject) {
    Mail.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve("The message was sent!");
      }
    });
  });
}

module.exports = Mail;