const _ = require("lodash");
const keys = require("../config/keys");
const Path = require("path-parser").default;
const { URL } = require("url");
const mongoose = require("mongoose");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");
const requireAdmin = require("../middlewares/requireAdmin");
const Order = mongoose.model("orders");
const Business = mongoose.model('businesses');
const createCheckoutSession = require("../services/Payments").createCheckoutSession;

module.exports = app => {
  app.post("/api/order", requireLogin, async (req, res) => {
    const {
      items,
      info: { cateringType, time, date, utensils, notes },
      address,
    } = req.body;
    console.log(req.body)

    const business = await Business.findOne({ _id: keys.businessID });
    const { taxRate, baseDeliveryCharge, perMileCharge, baseDeliveryChargeMiles } = business.settings;

    const MORENO_VALLEY_TAX = taxRate;
    const subtotal = _.sumBy(items, ({ amount, price }) => {
      return amount * price;
    });

    const formatOption = (option)=>{
      switch (option) {
        case "utensils":
          return { option: "utensils", amount: 0.15, total: 0.15 * subtotal };
        default:
          return;
      }}
      
    let optionsFormated = [];
    let options = [];
    if(utensils === "true"){
      optionsFormated.push(formatOption("utensils"));
      options.push("utensils")
    }
    const optionsTotal = _.sumBy(optionsFormated, ({ total }) => {
      return total;
    });
    const deliveryCheck = cateringType == "Delivery";
    let deliveryAmount = deliveryCheck ? 0 : 0;
    if (deliveryCheck && address.distance > baseDeliveryChargeMiles) {
      deliveryAmount = deliveryAmount + (perMileCharge * (address.distance - baseDeliveryChargeMiles))
    }
    const serviceCharge = subtotal * 0.18;
    const taxes = (subtotal + optionsTotal + deliveryAmount+ serviceCharge) * MORENO_VALLEY_TAX || 0;
    const total = (subtotal + taxes + optionsTotal + deliveryAmount + serviceCharge) || 0;

    const order = new Order({
      _user: req.user.id,
      items: _.map(items, ({ amount, _id, note }) => {
        return { amount, menuItem: _id, note };
      }),
      cateringType,
      orderID: "",
      stripeID: "",
      paymentStatus: "pending",
      date,
      time,
      total: {
        subtotal,
        serviceCharge,
        delivery: deliveryAmount,
        options: optionsFormated,
        taxes,
        total
      },
      options,
      notes,
      status: "pending",
      address,
      dateCreated: Date.now(),
      dateUpdated: new Date()
    });

    try {
      await order.save();
      const sessionID = await createCheckoutSession(order._id)
      res.send(sessionID);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get("/api/order", requireLogin, async (req, res) => {
    const order = await Order.find({
      _user: req.user.id,
      $or: [{ status: "pending" }, { status: "accepted" }]
    }).populate("items.menuItem");
    res.send(order);
  });

  app.get("/api/order/past", requireLogin, async (req, res) => {
    console.log("past orders")
    const order = await Order.find({
      $and: [
        { _user: req.user.id },
        {
          $or: [{ status: "complete" },
          { status: "canceled" },
          { status: "expired" }]
        }
      ]
    }).populate("items.menuItem");
    console.log(order)
    res.send(order);
  });
  app.get("/api/newOrders", requireAdmin, async (req, res) => {
    const order = await Order.find({ paymentStatus: "authorized" }).populate("_user").populate({
      path: 'items.menuItem',
      populate: {
        path: 'category'
      }
    });
    res.send(order);
  });
  app.get("/api/currentOrders", requireAdmin, async (req, res) => {
    const order = await Order.find({
      $and: [
        { paymentStatus: "succeeded" },
        { status: "accepted" }]
    }).populate("_user").populate({
      path: 'items.menuItem',
      populate: {
        path: 'category'
      }
    });
    res.send(order);
  });
  app.get("/api/pastOrders", requireAdmin, async (req, res) => {
    const order = await Order.find({
      $or: [{ status: "complete" },
      { status: "canceled" }]
    }).populate("_user").populate({
      path: 'items.menuItem',
      populate: {
        path: 'category'
      }
    });
    res.send(order);
  });
};
