import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    labels: string[];
    data: number[];
    chartTitle?: string;
}

const PieChart: React.FC<PieChartProps> = ({ labels, data, chartTitle = '' }) => {
    const chartData: ChartData<'pie'> = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: [
                    '#80B64B',
                    '#FA402C',
                    '#918F8E'
                ],
                borderColor: [
                    'rgb(34, 197, 94)',
                    'rgb(239, 68, 68)',
                    'rgb(107, 114, 128)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options: ChartOptions<'pie'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: !!chartTitle,
                text: chartTitle,
            },
        },
    };

    return <Pie data={chartData} options={options} />;
};

export default PieChart;