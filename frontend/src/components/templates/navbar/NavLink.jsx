import { Link, useLocation } from "react-router-dom";
export const NavLink = (props) => {


  const location = useLocation();

  return (
    <>
      <Link to={props.path} className={`text-neutral-400  flex flex-col md:flex-row w-full gap- md:py-2 md:px-4 md:gap-2 items-center rounded-lg transition ease-in-out 300ms ${
        location.pathname === props.path && " md:bg-primary "
      }`}>
        <span className={`text-2xl md:text-2xl p-2 rounded-lg ${
          location.pathname === props.path &&"text-white md:text-white transition ease-in-out 300ms transform scale-110 md:scale-100 -translate-y-2 md:-translate-y-0 bg-primary  md:bg-transparent  flex w-fit items-center h-fit"
        }`}>
          {props.icon}
        </span>
        <h3 className={`text-xs md:text-lg transition ease-in-out 300ms  ${
          location.pathname === props.path && "text-primary md:text-white font-semibold"
        }`}>
          {props.name}
        </h3>
      </Link>
    </>
  );
};
