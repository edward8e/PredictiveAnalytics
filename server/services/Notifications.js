const _ = require("lodash");
const Twilio = require("twilio");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const utils = require('../utils/Utils');
const Mail = require('./Mail');
const Business = mongoose.model('businesses');

//Order Placed
const customerOrderEmailTemplate = require('./emailTemplates/customerOrderEmailTemplate');
const businessOrderEmailTemplate = require('./emailTemplates/businessOrderEmailTemplate');
//Order Approved
const customerOrderApprovedTemplate = require('./emailTemplates/customerOrderApprovedTemplate');
const businessOrdeApprovedTemplate = require('./emailTemplates/businessOrdeApprovedTemplate');
//Order Canceled
const customerOrderCanceledTemplate = require('./emailTemplates/customerOrderCanceledTemplate');
const businessOrderCanceledTemplate = require('./emailTemplates/businessOrderCanceledTemplate');

var twilio = new Twilio(keys.TwilioAccountSID, keys.TwilioAuthToken);

const OrderAccepted = async function (order) {
    const business = await Business.findOne({ _id: keys.businessID })
    const { settings: { phoneNumbers } ,businessName } = business;
    const PHONE_NUMBERS = phoneNumbers.split(",")

    const { items, cateringType, date, time, total: { total }, _user: { firstName, lastName, email},_id } = order;
    const menuMessage = _.map(items, ({ amount, menuItem: { itemName } }) => {
        return "\n(" + amount + ") " + itemName;
    });

    const textBody = businessName +
    "\nCatering Order Accepted" +
    "\n\nCustomer: " + firstName + " " + lastName +
    "\nType: " + cateringType +
    "\nDate: " + utils.getDate(date) +
    "\nTime: " + utils.formatAMPM(time) +
    "\n\n**Menu**" + menuMessage +
    "\n\nTotal: " + utils.formatMoney(total);

    let mailOptionsCustomer = {
        from: keys.emailUserName,
        to: email,
        subject: `${businessName} Order APPROVED Order#:${_id}`,
        html: customerOrderApprovedTemplate(business,order)
    };
    let mailOptionsBusiness = {
        from: keys.emailUserName,
        to: "edwardhernandez817@gmail.com",
        subject: `${businessName} Order APPROVED Order#:${_id}`,
        html: businessOrdeApprovedTemplate(business,order)
    };

    try {
        console.log("Sending Email...");
        await Mail.sendEMail(mailOptionsCustomer)
            .then(() => console.log("Customer Order Email sent to " + email))
            .catch((error) => console.log("error:", error))
        await Mail.sendEMail(mailOptionsBusiness)
            .then(() => console.log("Business Order Email sent to " + business.email))
            .catch((error) => console.log("error:", error))
    } catch (error) {
        console.log(error);
    }

    for (PhoneNumber of PHONE_NUMBERS) {
        try {
            await twilio.messages.create({
                body: textBody,
                from: keys.TwilioPhoneNumber,
                to: PhoneNumber
            })
            console.log("Sent to:", PhoneNumber)
        } catch (err) {
            res.status(422).send(err);
        }
    }
}
const OrderPlaced = async function (order) {
    const business = await Business.findOne({ _id: keys.businessID })
    const { settings: { phoneNumbers } ,businessName } = business;
    const PHONE_NUMBERS = phoneNumbers.split(",")
    const { items, cateringType, date, time, total: { total }, _user: { firstName, lastName, email },_id } = order;
    const menuMessage = _.map(items, ({ amount, menuItem: { itemName } }) => {
        return "\n(" + amount + ") " + itemName;
    });

    const textBody = businessName +
        "\nCatering Order Placed" +
        "\n\nCustomer: " + firstName + " " + lastName +
        "\nType: " + cateringType +
        "\nDate: " + utils.getDate(date) +
        "\nTime: " + utils.formatAMPM(time) +
        "\n\n**Menu**" + menuMessage +
        "\n\nTotal: " + utils.formatMoney(total);


    let mailOptionsCustomer = {
        from: keys.emailUserName,
        to: email,
        subject: `${businessName} Order is AWAITING approval Order#:${_id}`,
        html: customerOrderEmailTemplate(business,order)
    };
    let mailOptionsBusiness = {
        from: keys.emailUserName,
        to: "edwardhernandez817@gmail.com",
        subject: `${businessName} Order is AWAITING approval Order#:${_id}`,
        html: businessOrderEmailTemplate(business,order)
    };

    try {
        console.log("Sending Email...");
        await Mail.sendEMail(mailOptionsCustomer)
            .then(() => console.log("Customer Order Email sent to " + email))
            .catch((error) => console.log("error:", error))
        await Mail.sendEMail(mailOptionsBusiness)
            .then(() => console.log("Business Order Email sent to " + business.email))
            .catch((error) => console.log("error:", error))
    } catch (error) {
        console.log(error);
    }
console.log(phoneNumbers)
    for (PhoneNumber of PHONE_NUMBERS) {
        try {
            await twilio.messages.create({
                body: textBody,
                from: keys.TwilioPhoneNumber,
                to: PhoneNumber
            })
            console.log("Sent to:", PhoneNumber)
        } catch (error) {
            console.log(error);
        }
    }
}
const OrderCanceled = async function (order) {
    const business = await Business.findOne({ _id: keys.businessID })
    const { settings: { phoneNumbers } ,businessName } = business;
    const PHONE_NUMBERS = phoneNumbers.split(",")

    const { items, cateringType, date, time, total: { total }, _user: { firstName, lastName, email },_id } = order;
    const menuMessage = _.map(items, ({ amount, menuItem: { itemName } }) => {
        return "\n(" + amount + ") " + itemName;
    });


    const textBody = businessName +
        "\nCatering Order Canceled" +
        "\n\nCustomer: " + firstName + " " + lastName +
        "\nType: " + cateringType +
        "\nDate: " + utils.getDate(date) +
        "\nTime: " + utils.formatAMPM(time) +
        "\n\n**Menu**" + menuMessage +
        "\n\nTotal: " + utils.formatMoney(total);


    let mailOptionsCustomer = {
        from: keys.emailUserName,
        to: email,
        subject: `${businessName} Order CANCELED Order#:${_id}`,
        html: customerOrderCanceledTemplate(business,order)
    };
    let mailOptionsBusiness = {
        from: keys.emailUserName,
        to: "edwardhernandez817@gmail.com",
        subject: `${businessName} Order CANCELED Order#:${_id}`,
        html: businessOrderCanceledTemplate(business,order)
    };

    try {
        console.log("Sending Email...");
        await Mail.sendEMail(mailOptionsCustomer)
            .then(() => console.log("Customer Order Email sent to " + email))
            .catch((error) => console.log("error:", error))
        await Mail.sendEMail(mailOptionsBusiness)
            .then(() => console.log("Business Order Email sent to " + business.email))
            .catch((error) => console.log("error:", error))
    } catch (error) {
        console.log(error);
    }

    for (PhoneNumber of PHONE_NUMBERS) {
        try {
            await twilio.messages.create({
                body: textBody,
                from: keys.TwilioPhoneNumber,
                to: PhoneNumber
            })
            console.log("Sent to:", PhoneNumber)
        } catch (err) {
            res.status(422).send(err);
        }
    }
}

module.exports = { OrderCanceled, OrderPlaced, OrderAccepted };