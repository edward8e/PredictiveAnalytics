const _ = require("lodash");
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
        notes,
        total: { options, taxes, total, subtotal, serviceCharge } } = order;
    return `<body>` +
        `<p>Hello ${firstName} ${lastName},\n\n</p>` +
        `<p>Your catering order is currently awaiting approval from ${businessName}.</p>` +
        `<p>A following confirmation will be sent out when event has been confirmed by Caterer.</p>` +
        `<p>Payment has been authorized and will only be charged once order has been approved.\n\n</p>` +
        `<div >
        <h2>
          <strong>Order #:</strong>${_id}
        </h2>
        
      </div>`+
        `<h3>${utils.jsUcfirst(cateringType)} address:</h3>
      <div>${formatted_address}</div><br/>` +
        `<table>
      <thead>
        <tr>
          <th>Date Placed</th>
          <th>Catering Type</th>
          <th>Catering Time</th>
          <th>Catering Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${utils.getDate(dateCreated)}</td>
          <td>${cateringType}</td>
          <td>${utils.formatAMPM(time)}</td>
          <td>${utils.getDate(date)}</td>
        </tr>
      </tbody>
    </table><br/><br/>`+
        `<table striped bordered hover>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${_.map(
            items,
            ({ amount, menuItem: { itemName, price } }, index) => {
                return (
                    `<tr key=${index}>
                    <td>${amount}</td>
                    <td>${itemName}</td>
                    <td>${utils.formatMoney(price)}</td>
                    <td>${utils.formatMoney(amount * price)}</td>
                  </tr>`
                );
            }
        )}
            <tr>
              <td colSpan="4"></td>
            </tr>
            <tr>
              <td
                colSpan="4"
              >
                Total
              </td>
            </tr>
            <tr>
              <td colSpan="3" >
                Subtotal
              </td>
              <td>${utils.formatMoney(subtotal)}</td>
            </tr>
            ${_.map(options, ({ option, amount }, index) => {
            return (
                `<tr key=${index}>
                  <td colSpan="3" >
                    ${utils.jsUcfirst(option)}
                  </td>
                  <td>${utils.formatMoney(subtotal * amount)}</td>
                </tr>`
            );
        })}
        <tr>
              <td colSpan="3" >
                Ser. Chrg 18.0%
              </td>
              <td>${utils.formatMoney(serviceCharge)}</td>
            </tr>
            <tr>
              <td colSpan="3" >
                Taxes
              </td>
              <td>${utils.formatMoney(taxes)}</td>
            </tr>
            <tr>
              <td colSpan="3" >
                Total
              </td>
              <td>${utils.formatMoney(total)}</td>
            </tr>
          </tbody>
        </Table>`+
        `<p>Order Notes: ${notes}</p>`+
        `<p>Thank you,\n\n</p>` +
        `<p>${businessName}\n\n</p>` +
        `</body>`
        ;
};