const passport = require("passport");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const User = mongoose.model("users");
const { URL } = require("url");
const _ = require("lodash");
const Path = require("path-parser").default;
const crypto = require("crypto");
const keys = require("../config/keys");
const Mail = require('../services/Mail');

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/dashboard");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.post("/auth/register", (req, res) => {
    const { firstName, lastName, password, email } = req.body;

    User.findOne({ email }, async (err, doc) => {
      if (err) {
        res.status(500).send("error occured");
      } else {
        if (doc) {
          res.status(422).send("Username already exists");
        } else {
          const token = crypto.randomBytes(20).toString("hex");
          const user = new User();
          user.firstName = firstName;
          user.lastName = lastName;
          user.email = email;
          user.phone = ""
          user.password = user.hashPassword(password);
          user.validateAccountToken = token;

          let mailOptions = {
            from: keys.emailUserName,
            to: email,
            subject: "Confirm Saboree Catering Email",
            html:
              `<body>` +
              `<p>Hi ${firstName} ${lastName},\n\n</p>` +
              `<p>Please click on the following link to validate your account email.\n\n</p>` +
              `<a href="${keys.redirectDomain}/register/${token}">Validate Link</a>` +
              `</body>`
          };
          try {
            await user.save();
            console.log("Sending Email...");
            await Mail.sendEMail(mailOptions)
              .then(() => console.log("Registration Email sent to " + email))
              .catch((error) => console.log("error:", error))
            await res.redirect("/");
          } catch (err) {
            res.status(500).send(err);
          }
        }
      }
    });
  });

  app.post("/api/register/webhooks", (req, res) => {
    const p = new Path("/api/register/:userId");
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, userId: match.userId };
        }
      })
      .compact()
      .uniqBy("email", "userId")
      .each(({ userId, email }) => {
        console.log("Validated Email: " + email);
        User.updateOne(
          {
            _id: userId,
            email: email,
            validated: false
          },
          {
            $set: { validated: true }
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post("/auth/login", passport.authenticate("local"), (req, res) => {
    if (req.user.validated) {
      res.send(req.user);
    } else {
      req.logout();
      res.status(501).send("Need to confirm account Email.");
    }
  });

  app.post("/auth/validateAccount", async (req, res) => {
    const user = await User.findOne({ validateAccountToken: req.body.token });
    if (user == null) {
      console.log("Validation Error");
      res.json({ status: false });
    } else {
      await user.updateOne({ validated: true, validateAccountToken: null });
      res.status(200).send({ status: true });
    }
  })
};
