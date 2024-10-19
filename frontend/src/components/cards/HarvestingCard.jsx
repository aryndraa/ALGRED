export const HarvestingCard = () => {
    return (
        <>
            <div className="bg-white w-full  p-6 py-6 md:py-6 md:p-8 h-full  rounded-lg shadow-sm flex flex-col items-center">
                <h2 className="text-xl md:text-xl font-medium mb-4 md:mb-5">Current State <span className="text-primary font-medium">Harvesting</span></h2>
                <div className="flex flex-col gap-4 md:gap-4 items-center">
                    <span className="text-4xl md:text-5xl font-semibold">2 Hours</span> 
                    <p className="text-base md:text-base">
                        <span>02:03:28</span> left until <span className="text-secondary font-medium">Reproduction</span>
                    </p>
                </div>
            </div>
        </>
    )
}