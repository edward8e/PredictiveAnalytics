const utils = require('../../utils/Utils');

module.exports = (business, order) => {
    const { businessName } = business
    const { _user: { firstName, lastName }, cateringType,
        date,
        dateCreated,
        time,
        address: { formatted_address },
        items,
        _id,
        total: { options, taxes, total, subtotal } } = order;
    return `<body>` +
        `<p>Hello ${firstName} ${lastName},\n\n</p>` +
        `<p>Your catering order has been canceled by ${businessName}.</p>` +
        `<p>Order #:${_id}</p>` +
        `<p>Catering Type: ${cateringType}</p>` +
        `<p>Catering Date: ${utils.getDate(date)}</p>` +
        `<p>Catering Time: ${utils.formatAMPM(time)}</p>` +
        `<p>Total: ${utils.formatMoney(total)}</p>` +
        `<p>Thank you,\n\n</p>` +
        `<p>${businessName}\n\n</p>` +
        `</body>`
        ;
};