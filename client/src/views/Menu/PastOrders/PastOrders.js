import _ from 'lodash';
import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import OrderItem from '../../../components/OrderItem';
import OrderInvoice from '../../../components/OrderInvoice';
import {fetchPastOrders} from '../../../actions';
import {organizeOnDate} from '../../../utils';

const PastOrders = ()=>{
  const dispatch= useDispatch();
  const order = useSelector(state=>state.order);

  useEffect(()=>{
    dispatch(fetchPastOrders());
  },[dispatch])

  const renderOrders=()=>{
    const { pastOrders} = order
    return _.map(organizeOnDate(pastOrders,'date', true), (order)=>{
      return <OrderItem key={order._id} order={order}/>
    })
  }

    const orderSelected = _.get(order, "selectedOrder");
    return (
      <div>
        <h2>Past Orders</h2>
        {orderSelected? <OrderInvoice order={order.selectedOrder}/>: renderOrders()}
      </div>
    );
  }

export default PastOrders;
