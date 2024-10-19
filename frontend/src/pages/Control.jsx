import { ControlCard } from "../components/cards/ControlCard";
import { IoWaterOutline } from "react-icons/io5";
import { MdOutlineHeatPump, MdHeatPump } from "react-icons/md";
import { BiWater } from "react-icons/bi";
import { Sending } from './../api/BlynkApi';
import { useState } from "react";
import { RiWaterFlashLine } from "react-icons/ri";
import { RiWaterPercentLine } from "react-icons/ri";
import { TbOvalVertical } from "react-icons/tb";

export const Control = () => {
    const { startFarm, startOptimal, startVibrator, startAddFertilizer,startAddPh, startValve } = Sending();

    // State untuk melacak status aktif setiap ControlCard
    const [activeStatus, setActiveStatus] = useState({
        farming: false,
        optimalPh: false,
        pump1: false,
        pump2: false,
        vibrator: false,
        valve: false,
    });

    const handlePowerClick = (cardName, sendFunction) => {
        setActiveStatus((prevStatus) => {
            const newStatus = !prevStatus[cardName];

            if (sendFunction) {
                sendFunction(newStatus); // Mengirim status baru (nyala/mati)
            }

            return {
                ...prevStatus,
                [cardName]: newStatus,
            };
        });
    };

    // Hitung jumlah kartu yang aktif
    const activeCount = Object.values(activeStatus).filter(isActive => isActive).length;

    return (
        <>
            <section className="md:ml-72 px-4 md:px-6 pb-12 flex flex-col gap-3 md:gap-5 mb-16 md:mb-0">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                    <ControlCard
                        icon={<BiWater />}
                        name={'Sector Farming'}
                        onPowerClick={() => handlePowerClick('farming', startFarm)}
                    />
                    <ControlCard
                        icon={<RiWaterFlashLine />}
                        name={'Adding Fertilizer'}  
                        onPowerClick={() => handlePowerClick('pump1', startAddFertilizer)}
                        />
                    <ControlCard
                        icon={<RiWaterPercentLine />}
                        name={'Adding pH'}
                        onPowerClick={() => handlePowerClick('pump2', startAddPh)}
                    />
                    <ControlCard
                        icon={<IoWaterOutline />}
                        name={'Optimal pH'}
                        onPowerClick={() => handlePowerClick('optimalPh', startOptimal)}
                        />
                    <ControlCard
                        icon={<MdOutlineHeatPump />}
                        name={'Vibrator'}
                        onPowerClick={() => handlePowerClick('vibrator', startVibrator)}
                        />
                    <ControlCard
                        icon={<TbOvalVertical />}
                        name={'Valve'}
                        onPowerClick={() => handlePowerClick('valve', startValve)}
                        />
                </div>
            </section>
        </>
    );
};
