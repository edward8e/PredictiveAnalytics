const _ = require("lodash");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const requireAdmin = require("../middlewares/requireAdmin");

const Business = mongoose.model('businesses');


module.exports = app => {
    app.post("/api/settings", requireAdmin, async (req, res) => {
        const { 
          taxRate,
          deliveryMinimum, 
          deliveryDistance, 
          baseDeliveryCharge, 
          baseDeliveryChargeMiles,
          perMileCharge,
          pickupMinimum,
          phoneNumbers 
        } = req.body;    
        try {
            await Business.updateOne(
                {_id:"5e3b6d36d19af1001b899b7b"},
              {
                settings: {
                    taxRate,
                    deliveryMinimum, 
                    deliveryDistance, 
                    baseDeliveryCharge, 
                    baseDeliveryChargeMiles,
                    perMileCharge,
                    pickupMinimum,
                    phoneNumbers
                  },
                  dateUpdated: new Date()
              }
            );
            res.send("success");
          } catch (err) {
            res.status(422).send(err);
          }
      });

      app.post("/api/createBusiness", requireAdmin, async (req, res) => {
        const { businessName, email } = req.body;

        const business = new Business({
          businessName,
          email,
          dateCreated: Date.now(),
          dateUpdated: new Date()
        });
    
        try {
          await business.save();
          res.send("success");
        } catch (err) {
          res.status(422).send(err);
        }
      });

      app.get("/api/fetchBusiness", async (req, res) => {
            const business = await Business.findOne({_id:keys.businessID})
            res.send(business);
          });


};
