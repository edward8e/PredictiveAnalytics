import _ from 'lodash';
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from '../../../components/OrderItem';
import OrderInvoice from '../../../components/OrderInvoice';
import { fetchNewOrders } from '../../../actions';

const NewOrders = () => {
  const order = useSelector(state => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewOrders());
  }, [dispatch])

  const renderOrders = () => {
    return _.map(order.newOrders, (order) => {
      return <OrderItem key={order._id} order={order} />
    })
  }

  const orderSelected = _.get(order, "selectedOrder");
  return (
    <div>
      <h2>New Orders</h2>
      {orderSelected ? <OrderInvoice order={order.selectedOrder} /> : renderOrders()}
    </div>
  );
}


export default NewOrders;
