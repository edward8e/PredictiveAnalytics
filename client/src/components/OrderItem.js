import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Card, CardHeader, CardBody, Badge, Button } from "reactstrap";
import { getDate, formatAMPM, formatMoney } from '../utils';
import { selectedOrder, approveOrder } from '../actions';
import ConfirmCompleteModal from './Modals/ConfirmCompleteModal';
import CancelOrderModal from './Modals/CancelOrderModal';

const OrderItem = (props) => {
    const [toggle, setToggle] = useState(false);
    const [toggleCancel, setToggleCancel] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const onOrderSelect = () => {
        dispatch(selectedOrder(props.order));
    }
    const renderBadge = () => {
        const { status } = props.order;
        switch (status) {
            case "pending":
                return <Badge className="mr-1" color="warning">NEEDS APPROVAL</Badge>;
            case "accepted":
                return <Badge className="mr-1" color="primary">ACCEPTED</Badge>;
            case "canceled":
                return <Badge className="mr-1" color="danger">CANCELED</Badge>;
            case "complete":
                return <Badge className="mr-1" color="success">COMPLETE</Badge>;
            case "expired":
                return <Badge className="mr-1" color="danger">EXPIRED</Badge>;
            default:
                return;
        }
    }
    const renderPayment = () => {
        const { paymentStatus } = props.order;
        switch (paymentStatus) {
            case "authorized":
                return <Badge className="mr-1" color="success">PAYMENT AUTHORIZED</Badge>;
            case "succeeded":
                return <Badge className="mr-1" color="success">PAID</Badge>;
            case "canceled":
                return <Badge className="mr-1" color="danger">PAYMENT CANCELED</Badge>;
            default:
                return;
        }
    }
    const onApproveOrder = async () => {
        await dispatch(approveOrder({ _id: props.order._id }));
        history.push('/dashboard/order/current');
    }
    const { _id, _user: { firstName, lastName }, cateringType, date, time, total: { total } } = props.order
    return <Card>
        <ConfirmCompleteModal order={props.order} toggle={toggle} onToggle={() => setToggle(!toggle)} />
        <CancelOrderModal order={props.order} toggle={toggleCancel} onToggle={() => setToggleCancel(!toggleCancel)} />
        <CardHeader>Invoice <strong>#{_id} {renderBadge()} {renderPayment()}</strong>
            <div className="float-right">
                <Button color="info" size="sm" onClick={onOrderSelect}>Invoice Information</Button>{" "}
                {props.order.status === "pending" && <Button color="danger" size="sm" onClick={() => { setToggleCancel(!toggleCancel) }}>Cancel/Decline Order</Button>}{" "}
                {props.order.status === "pending" && <Button color="success" size="sm" onClick={() => { onApproveOrder() }}>Approve Order</Button>}
                {props.order.status === "accepted" && <Button color="success" size="sm" onClick={() => setToggle(!toggle)}>Force Complete</Button>}</div></CardHeader>
        <CardBody>
            <div>Customer: {firstName} {lastName}</div>
            <div>Type: {cateringType}</div>
            <div>Date: {getDate(date)}</div>
            <div>Time: {formatAMPM(time)}</div>
            <div>Total: {formatMoney(total)}</div>
        </CardBody>
    </Card>

}

export default OrderItem;