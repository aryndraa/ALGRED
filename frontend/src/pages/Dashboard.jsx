import { HarvestingCard } from "../components/cards/HarvestingCard";
import { CartCard } from "../components/cards/CartCard";
import { LinkControlCard } from "../components/cards/LinkControlCard";
import { StatusCard } from "../components/cards/StatusCard";
import { IndicatorCard } from "../components/cards/indicator/IndicatorCard";
import { SliderIndicator } from "../components/cards/indicator/SliderIndicator";
import { Fetching } from './../api/BlynkApi';
import { OptimalPh } from "../components/cards/OptimalPh";

export const Dashboard = () => {

  const { temperature, water } = Fetching();

  return (
    <>
      <section className="md:ml-72  px-4 md:px-6 flex flex-col gap-3  md:gap-5 mb-16 md:mb-0 ">
        <div className="flex gap-3 md:gap-5  flex-col md:flex-row ">
          <div className="flex-1 flex flex-col justify-between gap-3 md:gap-5">
            <div className="flex-1">
              <HarvestingCard />
            </div>
            <div className="flex-1 flex-grow-[1.8] md:hidden ">
              <CartCard />
            </div>
            <div className="flex-1">
              <LinkControlCard />
            </div>
          </div>
          <div className="flex-1 flex-grow-[1.8] hidden md:block">
            <CartCard />
          </div>
        </div>
        <div className="flex flex-col gap-5 md:flex-row justify-between">
          <div className=" md:p-8 gap-3 md:gap-0 flex items-center  w-full md:w-[100%] md:bg-white flex-1  rounded-lg">
            <div className="flex-1 md:pr-5  md:border-r-2 border-neutral-400">
              <StatusCard 
                title={'Temperature'}
                value={temperature}
                type={'°C'}
                status={'Optimal'}
                color={'primary'} 
              />
            </div>
            <div className="flex-1 md:pl-5 ">
                <OptimalPh/>
            </div>
          </div>
          <div className="flex-1 gap-3 flex flex-col md:flex-row  ">
            <div className="flex-1 h-fit">
              <IndicatorCard 
                value={water}
              />
            </div>
            <div className="flex-1 ">
              <SliderIndicator />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
