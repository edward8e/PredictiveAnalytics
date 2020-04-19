import _ from 'lodash';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from '../../../components/OrderItem';
import OrderInvoice from '../../../components/OrderInvoice';
import { fetchCurrentOrders } from '../../../actions';
import { organizeOnDate } from '../../../utils';

const CurrentOrders = (props) => {
  const order = useSelector(state => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentOrders());
  },[dispatch]);

  const renderOrders = () => {
    const { currentOrders } = order
    return _.map(organizeOnDate(currentOrders, 'date'), (order) => {
      return <OrderItem key={order._id} order={order} />
    })
  }

  const orderSelected = _.get(order, "selectedOrder");
  return (
    <div>
      <h2>Current Orders</h2>
      {orderSelected ? <OrderInvoice order={order.selectedOrder} /> : renderOrders()}
    </div>
  );
}


export default CurrentOrders;
