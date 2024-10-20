import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import {Fetching} from '../../../api/BlynkApi'

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

export const IndicatorCard = (props) => {

    const {water} = Fetching()

    const usedSpaceMode = water;
    const totalSpaceMode= 10;
    const availableSpace= totalSpaceMode - usedSpaceMode ; 
    const usedPercentage = ((availableSpace / totalSpaceMode) * 100).toFixed(0); 
    const capacity = 5;
    const adjustedCapacity= (capacity * (usedPercentage / 100)); 
    var cartcon = 100 - usedPercentage ;


    // Data for the chart
    const data = {
        labels: ['Used Space', 'Remaining Space'],
        datasets: [
            {
                data: [usedPercentage, cartcon ],
                backgroundColor: ['#8EBEDC', '#E0E0E0'], // Colors for the chart
                hoverBackgroundColor: ['#8EBEDC', '#E0E0E0'],
                borderWidth: 0,
            },
        ],
    };

    // Options for customizing the chart
    const options = {
        rotation: -90, // Start angle for the semi-circle
        circumference: 180, // Set to 180 to make it a semi-circle
        cutout: '70%', // Create a doughnut effect
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
            tooltip: {
                enabled: true, // Disable tooltip
            },
        },
    };

    return (
        <div className='bg-white p-5 pb-3 w-full max-h-full min-h-full flex flex-col items-center relative z-0 rounded-lg'>
            <h1 className='text-xl font-medium mb-4'>Tub Space</h1>
            <div className='-mt-12'>
                <Doughnut data={data} options={options} className='w-[80%]'/>
                <h2 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1 text-3xl font-semibold'>
                    {usedPercentage}%
                </h2>
            </div>
            <div className='flex justify-center items-center w-full -mt-8'>
                <div className='text-center pr-4 border-r border-neutral-400'>
                    <h3 className='text-sm text-neutral-400'>Used Space</h3>
                    <p className='text-xl font-medium text-neutral-500'>{adjustedCapacity} L</p>
                </div>
                <div className='text-center pl-4 border-l border-neutral-400'>
                    <h3 className='text-sm text-neutral-400'>Total Space</h3>
                    <p className='text-xl font-medium text-neutral-500'>{capacity} L</p>
                </div>
            </div>
        </div>
    );
};
