import _ from "lodash";
import React, { useEffect } from "react";
import { Button, Alert } from 'reactstrap';
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { formatDay, formatAMPM, formatMoney } from "../../../utils/Utils";
import CartItem from './CartItem';

const Cart = ({ checkout, onCheckout }) => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 770 });
  const cart = useSelector(state => state.cart);
  const business = useSelector(state => state.business);

  const MORENO_VALLEY_TAX = business.settings.taxRate || 0;
  const subtotal = _.sumBy(cart.items, ({ amount, price }) => {
    return amount * price;
  });
  const utensilsCheck = cart.info.utensils === "true";
  const deliveryCheck = cart.info.cateringType === "Delivery";
  const distanceSelected = cart.address.distance;
  const { baseDeliveryCharge, baseDeliveryChargeMiles, perMileCharge } = business.settings;
  let deliveryAmount = deliveryCheck ? 0 : 0;
  if (deliveryCheck && distanceSelected && distanceSelected > baseDeliveryChargeMiles) {
    deliveryAmount = deliveryAmount + (perMileCharge * (distanceSelected - baseDeliveryChargeMiles))
  }
  const utensilsAmount = utensilsCheck ? (subtotal * 0.15) : 0;
  const serviceCharge = subtotal * 0.18;
  const taxes = (subtotal + utensilsAmount + deliveryAmount + serviceCharge) * MORENO_VALLEY_TAX || 0;
  const total = (subtotal + taxes + utensilsAmount + deliveryAmount + serviceCharge) || 0;

  const renderOrderStatus = () => {
    const { time, date, cateringType } = cart.info;
    return (
      <div style={{ borderBottom: "1px solid #CCC", padding: "10px" }}>
        {`${cateringType} - ${formatDay(date)} at ${formatAMPM(time)}`}
      </div>
    );
  };

  const renderError = () => {
    const { valid, message } = cart.error;
    if (valid === false && message !== null) {
      return <Alert style={{ width: "100%", height: "50px" }} color="danger" className="btn-square">{message}</Alert>
    }
  }

  const renderCart = () => {
    return _.map(cart.items, ({ amount, itemName, price }, index) => {
      return (
        <CartItem amount={amount} itemName={itemName} price={price} key={index} index={index} />
      );
    });
  };

  const renderTotal = () => {
    return (
      <div style={{ padding: "10px", borderTop: "1px solid #CCC" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>SUBTOTAL</div>
          <div>{formatMoney(subtotal)}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>SER. CHRG 18.0%</div>
          <div>{formatMoney(serviceCharge)}</div>
        </div>
        {deliveryCheck &&
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>DELIVERY</div>
            <div>FREE</div>
          </div>}
        {utensilsCheck && <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>UTENSILS 15.0%</div>
          <div>{formatMoney(utensilsAmount)}</div>
        </div>}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>TAXES</div>
          <div>{formatMoney(taxes)}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>TOTAL</div>
          <div>{formatMoney(total)}</div>
        </div>
      </div>
    );
  };
  return (<>
    {renderError()}
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid lightgray",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "300px"

      }}
    >
      <div>
        <div
          style={{
            borderBottom: "1px solid #CCC",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "10px"
          }}
        >
          <div>
            <strong>Saboree Catering</strong>
          </div>
          <div>12630 Perris Blvd.</div>
          <div>Moreno Valley, CA 92553</div>
        </div>
        {renderOrderStatus()}

        {renderCart()}
      </div>
      {renderTotal()}
    </div>
    {!isTabletOrMobile&&!checkout && <Button
      style={{ marginTop: "25px", height: "50px" }}
      onClick={onCheckout}
      disabled={!cart.error.valid}
      className="btn-square"
      block
      color="success">CHECKOUT ({cart.items.length} ITEMS)</Button>}
    {isTabletOrMobile && !checkout && <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "white", padding: "15px 15px 30px 15px" }}><Button
      style={{ marginTop: "25px", height: "50px" }}
      onClick={onCheckout}
      disabled={!cart.error.valid}
      className="btn-square"
      block
      color="success">CHECKOUT ({cart.items.length} ITEMS)</Button></div>}
  </>
  );
}



export default Cart;
