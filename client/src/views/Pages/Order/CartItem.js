import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { formatMoney } from "../../../utils/Utils";
import { cartRemoveItem } from "../../../actions";

const CartItem = ({ amount, itemName, price, index }) => {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ maxWidth: 960 });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        borderBottom: "1px solid #CCC",
        backgroundColor: isTabletOrMobile? "#F8CBC2" : hover ? "#F8CBC2" : "white"
      }}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      onClick={() => { dispatch(cartRemoveItem(index)) }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ textAlign: "center", width: "20px" }}>{amount}</div>{" "}
        <div>{itemName}</div>
      </div>
      <div style={{ display: "flex" }}>
        {formatMoney(price * amount)}
        {isTabletOrMobile? <div style={{ color: "red", paddingLeft: "5px" }}> X </div> :hover === true && (
          <div style={{ color: "red", paddingLeft: "5px" }}> X </div>
        )}
      </div>
    </div>
  );

}

export default CartItem;
