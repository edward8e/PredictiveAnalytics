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
        `<p>Hello ${businessName},\n\n</p>` +
        `<p>Catering order has been canceled.</p>` +
        `<p>Order #:${_id}</p>` +
        `<p>Catering Type: ${cateringType}</p>` +
        `<p>Catering Date: ${utils.getDate(date)}</p>` +
        `<p>Catering Time: ${utils.formatAMPM(time)}</p>` +
        `<p>Total: ${utils.formatMoney(total)}</p>` +
        `<p>Thank you,\n\n</p>` +
        `<p>CateredPRO\n\n</p>` +
        `</body>`
        ;
};