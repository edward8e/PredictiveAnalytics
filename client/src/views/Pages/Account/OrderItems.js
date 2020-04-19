import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { redoPayment } from "../../../actions";
import { getDate, formatMoney } from "../../../utils";
import { Button } from "reactstrap";
import { useMediaQuery } from "react-responsive";

const OrderItems = ({ onSubmit, orderID, status, paymentStatus, ...props }) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);

  const submitPayment = async () => {
    try {
      const res = await dispatch(redoPayment({ orderID }));
      const stripe = window.Stripe(process.env.REACT_APP_STRIPE_KEY);
      const { error } = await stripe.redirectToCheckout({
        sessionId: res
      })
      console.error(error);
    } catch (error) {
      console.error(error);
    }
  }
  const renderStatus = () => {
    if (status === "pending") {
      if (paymentStatus === "authorized") {
        return "Awaiting Cater approval".toUpperCase();
      }
      if (paymentStatus === "pending") {
        return (
          <div>
            {"missing payment".toUpperCase()}
            <Button
              style={{ marginLeft: "20px" }}
              outline color="danger"
              size="sm"
              onClick={()=>submitPayment()}
            >
              Finish Payment
            </Button>
          </div>
        );
      }
    }
    return status.toUpperCase();
  };
  const isTabletOrMobile = useMediaQuery({ maxWidth: 960 });
  const { dateCreated, cateringType, total, index } = props;
  return (
    <tr
      style={{
        textAlign: "center",
        backgroundColor: hover ? "#b9e3e9" : "white",
        color: hover ? "#0b515c" : "black",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onSubmit()}
    >
      <td>{index}</td>
      <td>{getDate(dateCreated)}</td>
      {!isTabletOrMobile&&<><td>{cateringType}</td>
      <td>{formatMoney(total)}</td></>}
      <td>{renderStatus()}</td>
    </tr>
  );
}

export default OrderItems;
