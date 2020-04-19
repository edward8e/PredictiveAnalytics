import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { formatMoney } from '../../../utils';
import OrderItemModal from '../../../components/Modals/OrderItemModal';
import {cartAddItem} from '../../../actions';

const OrderItem = ({ item }) => {
    const { itemName, description, price } = item
    const [hover, setHover] = useState(false);
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = (formValues) => {
        dispatch(cartAddItem({...formValues, ...item}));
        setToggle(false);
        console.log("added to cart")
    }

    return <div style={{marginRight:"15px"}}
        onMouseEnter={() => { setHover(true) }}
        onMouseLeave={() => { setHover(false) }}
        onClick={() => setToggle(!toggle)}>
        <OrderItemModal item={item} onSubmit={onSubmit} toggle={toggle} onToggle={() => setToggle(!toggle)} />
        <div style={{ fontWeight: 700, padding: "8px 0px", color: hover && "green" }}>{itemName.toUpperCase()}</div>
        <div style={{ paddingBottom: "8px" }} className="text-muted">{description}</div>
        <div style={{ color: "green", fontWeight: 600 }}>{formatMoney(price)}</div>
    </div>
}

export default OrderItem;