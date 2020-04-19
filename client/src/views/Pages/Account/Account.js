import _ from "lodash";
import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import Header from "../../../components/Header";
import { fetchUserOrder, fetchPastUserOrder } from "../../../actions";
import OrderTable from './OrderTable';
import OrderDetail from "./OrderDetail";
import AccountPageTitle from './AccountPageTitle';
import AccountInfo from './AccountInfo';

const Account =()=> {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const order = useSelector(state=>state.order);

  useEffect(()=>{
    dispatch(fetchUserOrder());
    dispatch(fetchPastUserOrder());
  },[dispatch])

    const orderSelected = _.get(order, "selectedOrder");
    const {userOrders, pastUserOrders} = order;
    return (
      <div style={{backgroundColor:"white"}}>
        <Header/>
        {orderSelected ? (
          <OrderDetail />
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "white",
                textAlign: "center"
              }}
            >
                <AccountPageTitle active={page === 1}text="Current Orders" onSubmit={()=>{setPage(1)}}/>
                <AccountPageTitle active={page === 2}text="Past Orders" onSubmit={()=>{setPage(2)}}/>
                <AccountPageTitle active={page === 3}text="Account" onSubmit={()=>{setPage(3)}}/>
            </div>

            {page === 1 && <OrderTable data={userOrders}/>}
            {page === 2 && <OrderTable data={pastUserOrders}/>}
            {page === 3 && <AccountInfo />}
          </div>
        )}
        <div style={{marginBottom:"150px"}}></div>

      </div>
    );
  }


export default Account;
