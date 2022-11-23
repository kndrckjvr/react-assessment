import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const SidebarLinks = ({ title, path, icon }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? "font-bold" : "font-normal")}
    >
      <li className="mb-3 text-left mx-3">
        <div className="h-full rounded-full p-2 px-6 hover:bg-slate-800 transition-all duration-300">
          <FontAwesomeIcon icon={icon} />
          <span className="px-3">{title}</span>
        </div>
      </li>
    </NavLink>
  );
};

export default SidebarLinks;
