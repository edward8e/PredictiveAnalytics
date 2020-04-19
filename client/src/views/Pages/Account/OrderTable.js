import _ from 'lodash';
import React from "react";
import { useDispatch } from "react-redux";
import { Table } from "reactstrap";
import OrderItems from "./OrderItems";
import { selectedOrder } from "../../../actions";
import {organizeOnDate} from '../../../utils';
import { useMediaQuery } from "react-responsive";

const OrderTable =({data})=> {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 960 });
  const dispatch = useDispatch();
    return (
      <Table striped bordered hover>
        <thead>
          <tr style={{ textAlign: "center", fontWeight: "bold" }}>
            <th>#</th>
            <th>Date Placed</th>
            {!isTabletOrMobile&&<><th>Catering Type</th>
            <th>Total Amount</th></>}
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {_.map(organizeOnDate(data,'dateCreated'), (order, index) => {
            const {
              dateCreated,
              cateringType,
              total: { total },
              status,
              paymentStatus,
              _id
            } = order;
            return (
              <OrderItems
                key={index}
                onSubmit={() => {
                  dispatch(selectedOrder(order));
                }}
                orderID={_id}
                index={index}
                dateCreated={dateCreated}
                cateringType={cateringType}
                total={total}
                status={status}
                paymentStatus={paymentStatus}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }


export default OrderTable;
