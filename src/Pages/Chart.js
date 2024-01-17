import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = () => {
    // Sample data - Replace this with your actual data
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Monthly Data',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40, 35, 75, 90, 65, 80], // Replace this array with your actual data
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                labels: data.labels,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Monthly Data Chart</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default Chart;
