import { useState } from "react";
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { RiPlantFill } from "react-icons/ri";
import { Fetching } from './../../../api/BlynkApi';

Chart.register(ArcElement, Tooltip, Legend); 

export const SliderIndicator = () => {
    const [switchIndicator, setSwitchIndicator] = useState(1); 
    const { phCapacity, fertilizerCapacity } = Fetching();

    const handleIndicatorMode1 = () => {
        setSwitchIndicator(1);
    };

    const handleIndicatorMode2 = () => {
        setSwitchIndicator(2);
    };

    const usedSpaceMode1 = fertilizerCapacity ;
    const totalSpaceMode1 = 10;
    const availableSpace1 = totalSpaceMode1 - usedSpaceMode1; 
    const usedPercentage1 = ((availableSpace1 / totalSpaceMode1) * 100).toFixed(0); 
    const capacity1 = 250;
    const adjustedCapacity1 = (capacity1 * (usedPercentage1 / 100)); 

    const usedSpaceMode2 = phCapacity; 
    const totalSpaceMode2 = 10;
    const availableSpace2 = totalSpaceMode2 - usedSpaceMode2; 
    const usedPercentage2 = ((availableSpace2 / totalSpaceMode2) * 100).toFixed(0); 
    const capacity2 = 250;
    const adjustedCapacity2 = (capacity2 * (usedPercentage2 / 100)); 

    const dataMode1 = {
        labels: ['Used Space', 'Remaining Space'],
        datasets: [
            {
                data: [usedPercentage1], 
                backgroundColor: ['#71AEA7', '#E0E0E0'],
                hoverBackgroundColor: ['#71AEA7', '#E0E0E0'],
                borderWidth: 0,
            },
        ],
    };

    const dataMode2 = {
        labels: ['Used Space', 'Remaining Space'],
        datasets: [
            {
                data: [usedPercentage2], // Corrected order
                backgroundColor: ['#FF6384', '#E0E0E0'],
                hoverBackgroundColor: ['#FF6384', '#E0E0E0'],
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
                enabled: false, // Disable tooltip
            },
        },
    };

    // Conditional rendering for charts based on switchIndicator
    const selectedData = switchIndicator === 1 ? dataMode1 : dataMode2;
    const usedSpace = switchIndicator === 1 ? usedSpaceMode1 : usedSpaceMode2;
    const totalSpace = switchIndicator === 1 ? totalSpaceMode1 : totalSpaceMode2;
    const percentageUsed = ((usedSpace / totalSpace) * 100).toFixed(0); // Calculate percentage

    return (
        <>
            <div className='bg-white p-5 pb-3 w-full max-h-full min-h-full flex flex-col items-center relative z-0 rounded-lg'>
                <div className="flex justify-between items-center w-full mb-4 relative z-[5]">
                    <h1 className='text-xl font-medium'>Tub Space</h1>
                    <div className="flex gap-2 items-center">
                        <button onClick={handleIndicatorMode1} className={`text-sm p-2 cursor-pointer bg-white border border-neutral-400 flex items-center justify-center rounded-full ${switchIndicator === 1 ? 'bg-[#71AEA7] text-white' : ''}`}>
                            <RiPlantFill />
                        </button>
                        <button onClick={handleIndicatorMode2} className={`text-sm p-2 cursor-pointer bg-white border border-neutral-400 flex items-center justify-center rounded-full ${switchIndicator === 2 ? 'bg-pink-500 text-white' : ''}`}>
                            <RiPlantFill />
                        </button>
                    </div>
                </div>

                <div>
                    <div className='-mt-12'>
                        <Doughnut data={selectedData} options={options} className='w-full'/>
                        <h2 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-0 text-4xl font-semibold'>
                            {usedPercentage1}%
                        </h2>
                    </div>
                    <div className='flex justify-center items-center w-full -mt-8'>
                        <div className='text-center pr-4 border-r border-neutral-400'>
                            <h3 className='text-sm text-neutral-400'>Used Space</h3>
                            <p className='text-xl font-medium text-neutral-500'>
                                {switchIndicator === 1 ? adjustedCapacity1 : adjustedCapacity2} ml
                            </p>
                        </div>
                        <div className='text-center pl-4 border-l border-neutral-400'>
                            <h3 className='text-sm text-neutral-400'>Total Space</h3>
                            <p className='text-xl font-medium text-neutral-500'>250 ml</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
