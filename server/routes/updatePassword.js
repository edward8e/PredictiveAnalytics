const _ = require("lodash");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");
const keys = require("../config/keys");
const Mail = require('../services/Mail');

module.exports = app => {
  app.post("/auth/requestPasswordReset", async (req, res) => {
    const { email } = req.body;
    if (email === "") {
      res.status(422).send("email required");
    }
    console.log(email);

    const user = await User.findOne({ email });
    if (!user) {
      res.status(403).send("Invalid Account");
      return;
    } else {
      const token = crypto.randomBytes(20).toString("hex");
      await User.updateOne(
        { email },
        {
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000
        }
      );

      let mailOptions = {
        from: keys.emailUserName,
        to: email,
        subject: "Link to Reset Password",
        html:
          `<body>` +
          `<p>You are receiving this because you (or somone else) have requested the reset of the password for your account.\n\n</p>` +
          `<p>Please click on the following link to complete the process within one hour of receiving it:\n\n</p>` +
          `<a href="${keys.redirectDomain}/reset/${token}">Reset Link</a>` +
          `<p>\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n</p>` +
          `</body>`
      };
      console.log("Sending Email...");
      await Mail.sendEMail(mailOptions)
      .then(()=>console.log("Reset Password Email sent to "+ email ))
      .catch((error)=> console.log("error:", error))
    }
    res.json({ received: true });
  });

  app.post("/auth/resetCheck", async (req, res) => {
    const user = await User.findOne({$and:[
        { resetPasswordToken: req.body.token },
        { resetPasswordExpires: { $gt: Date.now()}}]});
    if (user == null) {
      console.log("password reset link is invalid or has expired");
      res.json({ status: false });
    } else {
      res.status(200).send({
        userID: user._id,
        status: true
      });
    }
  });

  app.post("/auth/resetPassword", async (req, res) => {
    console.log(req.body)
    const {userID, password}= req.body
    try{
      const user = new User();
      await User.updateOne({_id: userID},
        {password: user.hashPassword(password),
        resetPasswordToken: null,
        resetPasswordExpires: null});
      console.log('password updated');
      res.status(200).send({updated: true});
      } catch (error){
        console.log('no user exists in the db to update');
        res.status(404).json('no user exist in db to update');
      }
  });
};
