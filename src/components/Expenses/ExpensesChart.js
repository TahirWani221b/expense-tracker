import React from 'react';
import Chart from '../Chart/Chart';

function ExpensesChart(props) {
    return (<div>
        <Chart chartExpenses={props.chartData} />
    </div>);
}

export default ExpensesChart;
