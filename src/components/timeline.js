import React, { Component } from 'react'
import Chart from "chart.js";
// import classes from "./LineGraph.module.css";

export default class Timeline extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        var ctx = document.getElementById('myChart').getContext('2d');

        var densityData = {
            label: 'Density of Planets (kg/m3)',
            data: [5427, 5243, 5514, 3933, 1326, 687, 1271, 1638]
        };

        var barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
                datasets: [densityData]
            }
        });
    }
    render() {
        return (
            <div className={'test'}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}