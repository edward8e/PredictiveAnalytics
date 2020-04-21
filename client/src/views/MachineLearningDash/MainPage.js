import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import Header from './Header';
import { fetchAnalytics } from '../../actions';

const MainPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAnalytics());
      }, [dispatch])
    return (<div>
        <Header />
    </div>)

}

export default MainPage;