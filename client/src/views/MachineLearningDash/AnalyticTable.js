import _ from 'lodash';
import React from "react";
import { useDispatch } from "react-redux";
import { Table } from "reactstrap";
import TableItem from './TableItem';
import {fetchSelectedData, SelectedAnalyticData} from '../../actions'

const AnalyticTable = ({data}) => {
    const dispatch = useDispatch();
    return (
        <Table striped bordered hover>
            <thead>
                <tr style={{ textAlign: "center", fontWeight: "bold" }}>
                    <th>#</th>
                    <th>Name</th>
                    <th>R2</th>
                </tr>
            </thead>
            <tbody>
                {_.map(data, (item, index) => {
                    
                    return <TableItem 
                    key={index} 
                    data={item} 
                    index={index}
                    onSubmit={()=> {
                        dispatch(fetchSelectedData({"itemName": data[index].itemName}))
                        dispatch(SelectedAnalyticData(data[index]))}}/>
                })}
            </tbody>
        </Table>
    );
}


export default AnalyticTable;
