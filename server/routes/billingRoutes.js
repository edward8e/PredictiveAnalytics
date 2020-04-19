const _ = require("lodash");
const mongoose = require("mongoose");
const Order = mongoose.model("orders");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");
const requireAdmin = require("../middlewares/requireAdmin");
const createCheckoutSession = require("../services/Payments").createCheckoutSession;
const Notifications = require('../services/Notifications');

module.exports = app => {
  app.post("/api/stripe/webhook", async (req, res) => {
    const {type,data: {object: { id }}} = req.body;
    switch (type) {
      case "payment_intent.succeeded":
        await Order.updateOne({$and:[
            {stripeID: id}, 
            {paymentStatus:{ $ne:"succeeded"}}]},
          {
            paymentStatus: "succeeded",
            dateUpdated: new Date()
          }
        );
        break;
      case "payment_intent.canceled":
        await Order.updateOne({$and:[
            {stripeID: id}, 
            {paymentStatus:{ $ne:"canceled"}}]},
          {
            paymentStatus: "canceled",
            dateUpdated: new Date()
          }
        );
        break;
      case "payment_intent.amount_capturable_updated":
        const update = await Order.updateOne(
          {$and:[
            {stripeID: id}, 
            {paymentStatus:{ $ne:"authorized"}}]},
          {
            paymentStatus: "authorized",
            dateUpdated: new Date()
          }
        );
        if(update.n !==0){
          const res = await Order.findOne({ stripeID: id }).populate("items.menuItem").populate("_user");
          Notifications.OrderPlaced(res)
        }
        break;
      case "payment_intent.payment_failed":
        await Order.updateOne({$and:[
            {stripeID: id}, 
            {paymentStatus:{ $ne:"failed"}}]},
          {
            paymentStatus: "failed",
            dateUpdated: new Date()
          }
        );
        break;
      default:
        // Unexpected event type
        return response.status(400).end();
    }
    res.json({ received: true });
  });
  app.post("/api/redoPayment", async (req, res) => {
    const {orderID} = req.body;
    const sessionID = await createCheckoutSession(orderID)
      res.send(sessionID);
  });
  
  app.post("/api/order/approve",requireAdmin, async (req, res) => {
    const {_id} = req.body;
    await Order.updateOne({_id},{status:"accepted"})
    const order = await Order.findOne({_id}).populate("items.menuItem").populate("_user");
   
    await stripe.paymentIntents.capture(
      order.stripeID,
      (err, paymentIntent) => {
        // asynchronously called
        console.log(err);
        console.log(paymentIntent);
      }
    );
    Notifications.OrderAccepted(order);
    res.send("success");
  });

  app.post("/api/order/complete",requireAdmin, async (req, res) => {
    const {_id} = req.body;
    await Order.updateOne({_id},{status:"complete"})
    res.send("success");
  });

  app.post("/api/order/cancel", async (req, res) => {
    const {_id} = req.body;
    await Order.updateOne({_id},{status:"canceled"})
    const order = await Order.findOne({_id}).populate("items.menuItem").populate("_user");

    stripe.paymentIntents.cancel(
      order.stripeID,
      (err, paymentIntent) => {
        // asynchronously called
        console.log(err);
        console.log(paymentIntent);
      }
    );
    Notifications.OrderCanceled(order);
    res.send("success");
  });
};
