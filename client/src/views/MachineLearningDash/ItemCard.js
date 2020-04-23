import React from 'react';
import { useSelector, } from 'react-redux';
import { Card, CardBody, CardTitle } from 'reactstrap';


const ItemCard = () => {
    const { itemName, r2, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday } = useSelector(state => state.selectedData.processedData);
    return <div>
        <Card>
            <CardBody>
                <CardTitle><h1>Item Info: {itemName.split('.').slice(0, -1).join('.')}</h1></CardTitle>

                <h3>R2: {parseFloat(r2).toFixed(2)}</h3>
                <h3>Weekly Predictions</h3>
                <h3>Sunday: {parseFloat(Sunday).toFixed(2)}</h3>
                <h3>Monday: {parseFloat(Monday).toFixed(2)}</h3>
                <h3>Tuesday: {parseFloat(Tuesday).toFixed(2)}</h3>
                <h3>Wednesday: {parseFloat(Wednesday).toFixed(2)}</h3>
                <h3>Thursday: {parseFloat(Thursday).toFixed(2)}</h3>
                <h3>Friday: {parseFloat(Friday).toFixed(2)}</h3>
                <h3>Saturday: {parseFloat(Saturday).toFixed(2)}</h3>

            </CardBody>
        </Card>
    </div>
}

export default ItemCard