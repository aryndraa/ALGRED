import {useState, useEffect} from 'react';
import axios from 'axios'
import { MdOutlineSignalWifiStatusbar4Bar } from "react-icons/md";

export const CheckStatus = () => {
    const [isOnline, setIsOnline] = useState(true); 

    return (
        <div className="flex items-center gap-1 ">
            <span className={`text-sm md:text-xl ${
                isOnline === true? 'text-green-500' :
                isOnline === false? 'text-neutral-500' :
                ''
            }`}>
                <MdOutlineSignalWifiStatusbar4Bar/>
            </span>
            {isOnline === null && <p>Checking...</p>}
            {isOnline === true && <p className="text-green-500 text-sm md:text-base">Online</p>}
            {isOnline === false && <p className="text-neutral-500 text-sm md:text-base">Offline</p>}
        </div>
    );
};

export const Fetching = () => {
    const [temperature, setTemperature]                = useState(0);
    const [water, setWater]                            = useState(0);  
    const [phCapacity, setPhCapacity]                  = useState(0);
    const [fertilizerCapacity, setFertilizerCapacity]  = useState(0);
    const [voltase, setVoltase]                        = useState(0);
    const [optimalPH, setOptimalPH]                    = useState(0);
    const [farmHours, setFarmHours]                    = useState(0);

    const TEMPERATURE_PIN = 'V8';
    const WATER_PIN = 'V0';    
    const PH_CAPACITY_PIN = 'V1';
    const FERTILIZER_CAPACITY_PIN = 'V2';
    const VOLTASE_PIN = 'V4';
    const PH_OPTIMAL_PIN = 'V7'
    const FARM_HOURS_PIN = 'V14'

    const BLYNK_AUTH_TOKEN = "smzXEZ9i1wm-SGlMGhabMlCu8angOyFw";
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const temperature = await axios.get(
                    `https://sgp1.blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&pin=${TEMPERATURE_PIN}`
                );

                const water = await axios.get(
                    `https://sgp1.blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&pin=${WATER_PIN}`
                );

                const phCapacity = await axios.get(
                    `https://sgp1.blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&pin=${PH_CAPACITY_PIN}`
                );

                const fertilizerCapacity = await axios.get(
                    `https://sgp1.blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&pin=${FERTILIZER_CAPACITY_PIN}`
                );

                const voltase = await axios.get(
                    `https://sgp1.blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&pin=${VOLTASE_PIN}`
                );

                const optimalPH = await axios.get(
                    `https://sgp1.blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&pin=${PH_OPTIMAL_PIN}`
                );

                const farmHours = await axios.get(
                    `https://sgp1.blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&pin=${FARM_HOURS_PIN}`
                )

                setTemperature(temperature.data);
                setWater(water.data);
                setPhCapacity(phCapacity.data);
                setFertilizerCapacity(fertilizerCapacity.data);
                setVoltase(voltase.data);
                setOptimalPH(optimalPH.data);
                setFarmHours(farmHours.data);

            } catch (error) {
                console.error('Error fetching data from Blynk API:', error)
            }
        }

        const intervalId = setInterval(fetchData, 1000);

        return () => clearInterval(intervalId);

    }, []);

    return {
        temperature, 
        water, 
        phCapacity, 
        fertilizerCapacity, 
        voltase,
        optimalPH,
        farmHours
    }
}

export const Sending = () => {
    const BLYNK_AUTH_TOKEN   = "smzXEZ9i1wm-SGlMGhabMlCu8angOyFw";
    const API_BASE_URL       = 'https://blynk.cloud/external/api/update'; 
    const FARM_PIN           = 'V5';
    const OPTIMAL_PIN        = 'V7';
    const ADD_PH_PIN         = 'V12'
    const ADD_FERTILIZER_PIN = 'V13'
    const VIBRATOR_PIN       = 'V15';
    const VALVE_PIN          = 'V16';

    const {optimalPH} = Fetching()

    const startFarm = async (isActive) => {
        const value = isActive ? 1 : 0;
        try {
            await axios.get(`${API_BASE_URL}?token=${BLYNK_AUTH_TOKEN}&pin=${FARM_PIN}&value=${value}`);
        } catch (error) {
            console.error('Error sending data to Blynk:', error);
        }
    };

    const startOptimal = async (isActive) => {
        const value = optimalPH ? 0 : 1;
        try {
            await axios.get(`${API_BASE_URL}?token=${BLYNK_AUTH_TOKEN}&pin=${OPTIMAL_PIN}&value=${value}`);
        } catch (error) {
            console.error('Error sending data to Blynk:', error);
        }
    };

    const startAddPh = async (isActive) => {
        const value = isActive? 1 : 0;
        try {
            await axios.get(`${API_BASE_URL}?token=${BLYNK_AUTH_TOKEN}&pin=${ADD_PH_PIN}&value=${value}`);
        } catch (error) {
            console.error('Error sending data to Blynk:', error);
        }
    }

    const startAddFertilizer = async (isActive) => {
        const value = isActive? 1 : 0;
        try {
            await axios.get(`${API_BASE_URL}?token=${BLYNK_AUTH_TOKEN}&pin=${ADD_FERTILIZER_PIN}&value=${value}`);
        } catch (error) {
            console.error('Error sending data to Blynk:', error);
        }
    }

    const startVibrator = async (isActive) => {
        const value = isActive ? 1 : 0;
        try {
            await axios.get(`${API_BASE_URL}?token=${BLYNK_AUTH_TOKEN}&pin=${VIBRATOR_PIN}&value=${value}`);
        } catch (error) {
            console.error('Error sending data to Blynk:', error);
        }
    };

    const startValve = async (isActive) => {
        const value = isActive? 1 : 0;
        try {
            await axios.get(`${API_BASE_URL}?token=${BLYNK_AUTH_TOKEN}&pin=${VALVE_PIN}&value=${value}`);
        } catch (error) {
            console.error('Error sending data to Blynk:', error);
        }
    }

    return { startFarm, startOptimal, startVibrator, startAddPh, startAddFertilizer, startValve};
};

export default {Fetching, Sending};