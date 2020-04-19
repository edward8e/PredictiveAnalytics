import 'react-toastify/dist/ReactToastify.css';
import './order.css';
import _ from "lodash";
import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";
import Header from './Header';
import OrderBar from './OrderBar';
import Checkout from './Checkout';
import { ToastContainer, toast } from 'react-toastify';
import { fetchMenuItems, fetchBusiness } from '../../../actions';
import Cart from './Cart';
import OrderItem from './OrderItem';
import CartMobile from './CartMobile';
import useCartErrors from './useCartErrors';

const Order = () => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 770 });
  const [checkout, setCheckout] = useState(false);
  const [cartSelected, setCartSelected] = useState(false);
  const menu = useSelector(state => state.menu);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  useCartErrors();
  useEffect(() => {
    dispatch(fetchMenuItems());
    dispatch(fetchBusiness());
  }, [dispatch])

  const onCheckout = () => {
    if (auth) {
      setCheckout(true);
      setCartSelected(false);
    } else {
      toast.error("Please login/register to complete your order.");
      setTimeout(() => { history.push('/login'); }, 3000);
    }
  }

  const renderMenus = () => {
    const groups = _.chain(menu.menuItems).filter({active:true}).groupBy("category._id").value()
    return _.map(groups, (group, index) => {
      const chunks = _.chunk(group, 2);
      return (<div key={index} style={{ marginBottom: "50px" }}>
        <div style={{ fontSize: "2rem", marginBottom: "25px", display: "flex", flexWrap: "wrap", textDecoration: "underline green", fontWeight: 900 }}>{group[0].category.categoryName.toUpperCase()}</div>
        {_.map(chunks, (set, index) => {
          return <Row key={index} style={{ margin: "0px" }}>
            {_.map(set, (item, index) => {
              return (
                <Col key={index} sm="12" md="6" style={{ padding: "8px 0px" }}>
                  <OrderItem item={item} />
                </Col>);
            })}
          </Row>
        })}
      </div>
      )
    })
  }

  return <div style={{ backgroundColor: "white", paddingTop: !checkout ? isTabletOrMobile? "50px":"150px" : "100px", paddingBottom:!checkout &&"100px" }}>
    <ToastContainer position="top-right" autoClose={5000} style={{ zIndex: 1999 }} />
    <Header fixed={"top"} />
    {!cartSelected && <Container>
      <br />
      <Row>
        <Col>
        {!checkout && <OrderBar fixed={!isTabletOrMobile} />}
          {!checkout ? renderMenus() : <Checkout onCheckout={setCheckout} />}
        </Col>
        {!isTabletOrMobile && <Col md="6" lg="4" style={{ paddingTop: checkout && "100px" }}>
          <div style={{
            minHeight: "300px",
            position: "fixed",
            width: "350px"
          }}><Cart checkout={checkout} onCheckout={onCheckout} /></div>
        </Col>}
      </Row>
      
    </Container>}
    {isTabletOrMobile &&!checkout && <CartMobile onCheckout={onCheckout} cartSelected={setCartSelected}/>}
  </div>
}

export default Order