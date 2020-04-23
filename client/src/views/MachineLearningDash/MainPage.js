import React, { useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import Header from './Header';
import AnalyticTable from './AnalyticTable';
import Graph from './Graph';
import ItemCard from './ItemCard';
import { fetchAnalytics } from '../../actions';

const MainPage = () => {
    const analyticData = useSelector(state => state.analytics);
    const dispatch = useDispatch();
    useEffect(() => { dispatch(fetchAnalytics()) }, [dispatch])
    return (<div>
        <Header />
        <Container>
            <Row>
                <Col><Graph /></Col>
                <Col><ItemCard /></Col>
            </Row>
            <AnalyticTable data={analyticData} />
        </Container>
    </div>)
}

export default MainPage;