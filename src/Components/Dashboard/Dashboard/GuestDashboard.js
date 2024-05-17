import React from 'react'
import { useSelector } from 'react-redux';
import '../Dashboard.css';
import './DashboardMain.css';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const GuestDashboard = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Points',
            data: [10000, 12000, 15000, 18000, 20000, 22000, 21000, 23000, 24000, 22000, 20000, 15000],
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            fill: true,
            tension: 0.4
        }]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className="dashboard">
            <div className="card average-rating">
                <span className='average-rating-text'>Average Ratings</span>
                <div className="star-with-rating"><h3>⭐️</h3><h4> 4.98</h4><span>⭐</span></div>
                <span className="last-month"><span>+0.8</span> than last month</span>
            </div>

            <div className="card chart">
                <h6>Point Balance</h6>
                <h5>15,837 <span className="stats">+1200 than last month</span></h5>
                <div className="chart-container">
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
    );
}

export default GuestDashboard
