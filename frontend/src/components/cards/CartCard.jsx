import { useState, useEffect } from "react";
import { FaLastfm, FaPlus } from "react-icons/fa6";
import { Line } from 'react-chartjs-2';
import { IoIosClose } from "react-icons/io";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const CartCard = () => {
    const [selectedOption, setSelectedOption] = useState("Last Month");
    const [weeklyData, setWeeklyData] = useState([]);
    const [mounthlyData, setMounthlyData] = useState([]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const fetchWeeklyData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/harvest/weekly-harvest');
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();

            console.log(data.data);  

            setWeeklyData(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchMounthlyData = async () => {
        try{
            const response = await fetch('http://localhost:5000/api/harvest/year-harvest');
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();

            setMounthlyData(data.data);
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        fetchWeeklyData();
        fetchMounthlyData();
    }, []);


    const dataLastMonth = {
        labels: ['week 1', 'week 2', 'week 3', 'week 4'],
        datasets: [
            {
                label: "Algae Harvest (g)",
                data: weeklyData.map((row) => row.amount),
                borderColor: "rgba(201,71,74,100)",
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: true,
                tension: 0.4, 
            },
        ],
    };

    const dataLastYear = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Algae Harvest (kg)",
                data: mounthlyData.map((row) => row.averageAmount),
                borderColor: "rgba(201,71,74,100)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                fill: true,
                tension: 0.4, 
            },
        ],
    };

    const chartData = selectedOption === "Last Month" ? dataLastMonth : dataLastYear;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        scales: {
            y: {
                title: {
                    display: false,
                },
                ticks: {
                    callback: function(value) {
                        return value + ' g';  
                    },
                },
            },
            x: {
                title: {
                    display: false,
                    text: selectedOption === "Last Month" ? "Weeks" : "Months",
                },
            },
        },
    };

    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    }

    const [formData, setFormData] = useState({amount: ''});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e)  => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch('http://localhost:5000/api/harvest/add-harvest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const result = await response.json();
                alert('Harvest result added successfully');
                setFormData({ amount: '' }); 
                fetchWeeklyData(); 
            } else {
                alert('Failed to add harvest result');
            }
            toggleForm();
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting form');
        }
    }



    return (
        <>
            <div className="p-5 md:p-6  bg-white rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg md:text-2xl font-medium">Harvest Result</h1>
                    <div>
                        <select 
                            value={selectedOption} 
                            onChange={handleOptionChange}
                            className="text-sm md:text-base text-neutral-400"
                        >
                            <option value="Last Month" className="text-sm">Last Month</option>
                            <option value="Last Year" className="text-sm">Last Year</option>
                        </select>
                    </div>
                </div>

                <div className="pb-6 md:pb-2 min-w-full  ">
                    <Line data={chartData} options={options} height={90}  />
                </div>

                <div className="">
                    <button onClick={toggleForm} className="flex w-full text-white font-medium text-sm md:text-base rounded-lg justify-center p-3 bg-[#434343]">
                        Input Harvest Results
                    </button>
                </div>
            </div>
            <div className={`fixed z-10 top-0 bottom-0 left-0 right-0 bg-black/20 justify-center items-center ${
                showForm ? 'flex' : 'hidden'
            }`}>
                <form onSubmit={handleSubmit} className="p-6 bg-white flex flex-col rounded-lg w-full md:w-96 mx-4 md:mx-0
                ">
                    <div className="flex items-center justify-between    mb-4 pb-4 border-b border-neutral-400">
                        <h1 className="text-xl font-semibold">Input Harvest</h1>
                        <button onClick={toggleForm} className="p-1 text-xl bg-neutral-700 text-white rounded-full">
                            <IoIosClose/>
                        </button>
                    </div>
                    <div className="mb-16  flex items-center justify-between gap-3">
                        <input 
                            type="number"
                            name="amount" 
                            id="amount" 
                            value={formData.amount}
                            onChange={handleInputChange}
                            placeholder="Amount / Gram" 
                            required
                            className="p-2 text-base md:text-lg  focus:outline-none flex-1 "
                        />
                        <span className="font-medium text-lg">
                            Gram
                        </span>
                    </div>
                    <button type="submit" className="p-2 bg-primary font-medium text-white rounded-lg">Add</button>
                </form>
            </div>
        </>

    );
};
