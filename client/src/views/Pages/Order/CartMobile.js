import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Badge, Container } from 'reactstrap';
import { FaCartArrowDown } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import Cart from './Cart';

const CartMobile = ({ cartSelected,onCheckout }) => {
    const cart = useSelector(state => state.cart);
    const [selected, setSelected] = useState(false);

    const selectCart = (select) => {
        setSelected(select)
        cartSelected(select);
    }
    const CartMobileDetailed = () => {
        return <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Container><Button 
            onClick={() => selectCart(false)} 
            style={{ width: "100%", height: "50px",backgroundColor: "white", borderRightWidth: "0px", borderLeftWidth: "0px" }} 
            block 
            className="btn-square">
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                <MdArrowBack style={{ marginRight: "5px" }} />BACK</div>
            </Button></Container>
            
            <Cart checkout={false} onCheckout={onCheckout} />
        </div>
    }
    return <>{!selected ? <><div style={{ position:"fixed", bottom:0,left:0,right:0, backgroundColor:"white", padding:"15px 15px 30px 15px" }}><Button onClick={() => selectCart(true)} style={{ width:"100%", height: "50px"}} block color="success" className="btn-square">
        <FaCartArrowDown />{" "}<strong>Cart<Badge className="mr-1" color="danger" pill>{cart.items.length}</Badge></strong></Button></div>
    
        </> : <CartMobileDetailed />
    }</>
}

export default CartMobile;