const _ = require("lodash");
const mongoose = require("mongoose");
const Order = mongoose.model("orders");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const schedule = require('node-schedule');
const Notifications = require('./Notifications');

const createCheckoutSession = async function (orderID) {
  const order = await Order.findOne({
    $and: [
      { _id: orderID },
      { paymentStatus: { $ne: "authorized" } },]
  })
    .populate("items.menuItem")
    .populate("_user");
  if (order == null) {
    return;
  }
  if (order.checkoutID) {
    return order.checkoutID;
  }
  const {
    items,
    cateringType,
    _user: { email },
    total: { options, delivery, taxes, serviceCharge }
  } = order;
  console.log(order)
  const line_items = _.map(
    items,
    ({ amount, menuItem: { itemName, description, price } }) => {
      return {
        name: itemName,
        description: description,
        images: ["https://example.com/t-shirt.png"],
        amount: Math.round(price * 100),
        currency: "usd",
        quantity: amount
      };
    }
  );
  // if (cateringType === "Delivery") {
  //   line_items.push({
  //     name: "Delivery",
  //     description: "Delivery Charge",
  //     images: ["https://example.com/t-shirt.png"],
  //     amount: Math.round(delivery * 100),
  //     currency: "usd",
  //     quantity: 1
  //   });
  // }

  for ({ option, total } of options) {
    line_items.push({
      name: option,
      description: option + " Charge",
      images: ["https://example.com/t-shirt.png"],
      amount: Math.round(total * 100),
      currency: "usd",
      quantity: 1
    });
  }
  line_items.push({
    name: "Service Charge",
    description: "Service Charge",
    images: ["https://example.com/t-shirt.png"],
    amount: Math.round(serviceCharge * 100),
    currency: "usd",
    quantity: 1
  });
  line_items.push({
    name: "Taxes",
    description: "Tax Charge",
    images: ["https://example.com/t-shirt.png"],
    amount: Math.round(taxes * 100),
    currency: "usd",
    quantity: 1
  });
  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    payment_method_types: ["card"],
    line_items: line_items,
    payment_intent_data: {
      capture_method: "manual"
    },
    success_url: keys.redirectDomain + "/account",
    cancel_url: keys.redirectDomain
  });
  await Order.updateOne(
    { _id: orderID },
    {
      checkoutID: session.id,
      stripeID: session.payment_intent,
      dateUpdated: new Date()
    }
  );
  return session.id;
};

const expireOrders = async function () {
  let expirationDate = new Date();
  expirationDate.setHours(0, 0, 0, 0);
  const res = await Order.updateMany({$and: [
      { paymentStatus: { $ne: "authorized" } },
      { paymentStatus: { $ne: "succeeded" } },
      { status: { $ne: "accepted" } },
      { status: { $ne: "complete" } },
      { status: { $ne: "expired" } },
      { dateCreated: { $lt: expirationDate } }]
  }, { status: "expired" })
  console.log("Cleared " + res.n + " Expired Orders")
}

const completedOrders = async function () {
  let completedDate = new Date();
  completedDate.setHours(0, 0, 0, 0);
  const res = await Order.updateMany({$and: [
      { status: "accepted" },
      { date: { $lt: completedDate } }
    ]}, { status: "complete" })
  console.log("Cleared " + res.n + " Completed Orders")
}

schedule.scheduleJob('5 0 * * *', () => { completedOrders() }) // run everyday at midnight
schedule.scheduleJob('5 0 * * *', () => { expireOrders() }) // run everyday at midnight
module.exports = { createCheckoutSession };
