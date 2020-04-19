import 'react-big-calendar/lib/css/react-big-calendar.css';
import _ from 'lodash';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardHeader } from 'reactstrap';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { fetchNewOrders, fetchCurrentOrders, fetchPastOrders } from '../../../actions';
import { combineDateTime } from '../../../utils';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const currDate = new Date();
const currYear = currDate.getFullYear();
const currMonth = currDate.getMonth();

const OrderCalendar=(props)=> {
  const order = useSelector(state => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPastOrders());
    dispatch(fetchCurrentOrders());
    dispatch(fetchNewOrders());
  },[dispatch]);


  const buildEvents = (order, type) => {
    return _.map(order, ({ date, time, cateringType }) => {
      let combinedTime = combineDateTime(date, time)
      switch (type) {
        case 'new':
          return { title: "New: "+cateringType, start: combinedTime, end: combinedTime, desc: "Customer", color: "green" }
        case 'current':
          return { title: "Current: "+cateringType, start: combinedTime, end: combinedTime, desc: "Customer" }
        case 'past':
          return { title: "Past: "+cateringType, start: combinedTime, end: combinedTime, desc: "Customer", color: "gray" }
        default:
          return;
      }
    })
  }
  
    const { newOrders, currentOrders, pastOrders } = order
    let events = [...buildEvents(newOrders, 'new'), ...buildEvents(currentOrders, 'current'), ...buildEvents(pastOrders, 'past')]
    return (
      <div className="animated">
        <Card>
          <CardHeader>
            <i className="icon-calendar"></i>Calendar{' '}
            <a href="https://coreui.io/pro/react/" className="badge badge-danger">CoreUI Pro Component</a>
            <div className="card-header-actions">
              <a href="https://github.com/intljusticemission/react-big-calendar" rel="noopener noreferrer" target="_blank" className="card-header-action">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CardHeader>
          <CardBody style={{ height: '40em' }}>
            <BigCalendar className="d-sm-down-none" style={{height: '-webkit-fill-available'}}
              {...props}
              events={events}
              views={['month', 'week', 'day']}
              step={30}
              defaultDate={new Date(currYear, currMonth, 1)}
              defaultView='month'
              toolbar={true}
              localizer={localizer}
              eventPropGetter={event => ({
                style: {
                  backgroundColor: event.color,
                },
              })}
            />
            <BigCalendar className="d-md-none"
              {...props}
              events={events}
              views={['day']}
              step={30}
              defaultDate={new Date(currYear, currMonth, 1)}
              defaultView='day'
              toolbar={true}
              localizer={localizer}
              eventPropGetter={event => ({
                style: {
                  backgroundColor: event.color,
                },
              })}
            />
          </CardBody>
        </Card>
      </div>
    );
  }




export default OrderCalendar;
