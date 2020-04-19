import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container } from 'reactstrap'
import { MdArrowBack } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import OrderDetails from './OrderDetails';
import Cart from './Cart';
import { placeOrder } from '../../../actions';

const Checkout = ({ onCheckout }) => {
    const isTabletOrMobile = useMediaQuery({ maxWidth: 770 });
    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const formRef = useRef();


    const onSubmit = async () => {
        console.log("submitted");
        try {
            const response = await dispatch(placeOrder(cart));
            const stripe = window.Stripe(process.env.REACT_APP_STRIPE_KEY);
            const { error } = await stripe.redirectToCheckout({
                sessionId: response
            })
            console.error(error);
        } catch (error) {
            console.error(error);
        }
    }

    return <div>
        <div style={{ position: "fixed", top: 50, left: 0, right: 0 }}><Container><Button
            onClick={() => onCheckout(false)}
            style={{ width: "100%", height: "50px", backgroundColor: "white", borderRightWidth: "0px", borderLeftWidth: "0px" }}
            block
            className="btn-square">
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                <MdArrowBack style={{ marginRight: "5px" }} />BACK</div>
        </Button>
        </Container>

        </div>

        <div style={{ borderBottom: "1px solid #CCC" }}><h1>Hey {auth.firstName},</h1>
            <h1>Let's Review your Order</h1></div>
        <div style={{ padding: "25px 0px" }}><h4>Order Details</h4>
            <OrderDetails innerRef={formRef} onSubmit={onSubmit} />
            {isTabletOrMobile && <Cart checkout={true} />}
            <Button
                block
                onClick={() => formRef.current.handleSubmit()}
                type="submit"
                color="success"
                disabled={!cart.error.valid}
                className="btn-square"
                style={{ height: "50px", marginTop: "25px" }}>CONTINUE TO PAYMENT</Button>
        </div>


    </div>
}

export default Checkout;