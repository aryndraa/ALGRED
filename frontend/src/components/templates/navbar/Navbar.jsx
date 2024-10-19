import { RiDashboardFill } from "react-icons/ri";
import { PiNewspaperFill } from "react-icons/pi";
import { FaBookOpen } from "react-icons/fa";
import { NavLink } from "./NavLink";
import { AiFillControl } from "react-icons/ai";
import logo from "../../../assets/Group.svg";

export const Navbar = () => {
  return (
    <>
    <div className="backdrop-blur-lg fixed z-[999] min-h-16 min-w-full  bottom-0 left-0 right-0 md:hidden">
    </div>

      <aside className="fixed z-[9999999] bottom-0 left-0 right-0 md:right-full md:top-0 gap-3 px-5 md:px-4 md:w-[17rem] pt-1 pb-3 m-4 my-2  md:m-0 shadow-md rounded-xl md:py-6 bg-white md:flex md:flex-col justify-between ">
        <div className="w-full flex flex-col items-center">
          <div className="hidden md:flex items-center mb-6 gap-5  py-3">
            <img src={logo} alt="logo" className="w-10" />
            <h1 className="text-4xl font-bold text-neutral-600">Algred.</h1>
          </div>
          <div className="flex md:flex-col  justify-between md:items-start gap-3 md:gap-6 w-full ">
            <NavLink path={"/"} name={"Dashboard"} icon={<RiDashboardFill />} />
            <NavLink path={"/control"} name={"Control"} icon={<AiFillControl />} />
            <NavLink path={"/news"} name={"News"} icon={<PiNewspaperFill />} />
            <span className="flex md:hidden">
              <NavLink path={"/guidebook"} name={"Guidebook"} icon={<FaBookOpen />} />
            </span>
          </div>
        </div>
        <div className="hidden md:block w-full">
          <NavLink path={"/guidebook"} name={"Guidebook"} icon={<FaBookOpen />} />
        </div>
      </aside>
    </>
  );
};
