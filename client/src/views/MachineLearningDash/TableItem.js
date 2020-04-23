import React, { useState } from "react";

const OrderItems = ({ onSubmit, index, ...props }) => {
    const [hover, setHover] = useState(false);
    const { itemName, r2 } = props.data;
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
            <td>{itemName}</td>
            <td>{r2}</td>
        </tr>
    );
}

export default OrderItems;
