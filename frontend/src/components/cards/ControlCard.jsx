import { useState, useEffect } from "react";
import { IoPowerOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export const ControlCard = ({ name, icon, onPowerClick }) => {
        const [isActive, setIsActive] = useState(() => {
            const savedStatus = localStorage.getItem(`${name}-status`);
            return savedStatus === "true";  // convert string to boolean
        });
    
        useEffect(() => {
            localStorage.setItem(`${name}-status`, isActive);
        }, [isActive, name]);

    const toggleActive = () => {
        setIsActive(!isActive);
    };

    const handleClick = () => {
        toggleActive(); 

        if (onPowerClick && typeof onPowerClick === 'function') {
            onPowerClick(); 
        }
    };

    return (
        <>
            <div className={`bg-white p-3 md:p-5 rounded-lg min-h-48 md:min-h-56 border-2 flex flex-col justify-between shadow-sm transition-all ease-in-out duration-500  ${isActive ? 'border-primary' : ''} border-2`}>
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex flex-col mb-1 md:mb-0">
                        <span className={`text-5xl md:text-7xl mb-2  ${isActive ? 'text-primary' : ''}`}>
                            {icon}
                        </span>
                        <h2 className={`text-sm md:text-xl  ${isActive ? 'text-primary font-medium' : ''}`}>
                            {name}
                        </h2>
                    </div>
                    <div className={`text-xs md:text-lg ${isActive ? 'text-primary' : ''}`}>
                        {isActive ? 'Active' : 'Inactive'}
                    </div>
                </div>
                <div className="flex justify-between items-end">
                    <Link to={"/guidebook"} className="text-neutral-400 text-xs md:text-base">Detail</Link>
                    <button className={`text-2xl md:text-3xl ${isActive ? 'text-primary' : 'text-neutral-600'}`} onClick={handleClick}>
                        <IoPowerOutline />
                    </button>
                </div>
            </div>
        </>
    );
};
