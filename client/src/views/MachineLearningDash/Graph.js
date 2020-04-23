import _ from 'lodash';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Plot from 'react-plotly.js';

import { fetchSelectedData } from '../../actions';

const Graph = () => {
    const dispatch = useDispatch();
    const itemData = useSelector(state => state.selectedData.fullData);
    const { itemName } = useSelector(state => state.selectedData.processedData);

    useEffect(() => { dispatch(fetchSelectedData({ "itemName": "Combination de Dos.csv" })) }, [dispatch])
    const getXValues = () => {
        return _.map(itemData, ({ dayOfWeek }) => {
            return dayOfWeek;
        })
    }
    const getYValues = () => {
        return _.map(itemData, ({ sold }) => {
            return sold;
        })
    }

    return <Plot
        data={[
            {
                x: getXValues(),
                y: getYValues(),
                type: 'scatter',
                mode: 'markers',
                // marker: { color: 'red' },
            },
        ]}
        layout={{
            width: "100%",
            height: 500,
            title: `${itemName} Daily Sales`,
            xaxis: {
                title: "Days of Week"
            },
            yaxis: {
                title: "# Sold"
            }
        }}
    />
}

export default Graph;