import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faCalendarCheck,
  faClipboardList,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ onStatusChange }) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const authNavItems = isAuthenticated
    ? [
        { to: "/taskManagement", icon: faCalendarCheck, text: "Task Management" },
        { to: "/logout", icon: faSignOutAlt, text: "Logout" },
      ]
    : [
        { to: "/", icon: faSignOutAlt, text: "Sign Up" },
        { to: "/login", icon: faSignOutAlt, text: "Login" },
      ];

  return (
    <div className="w-64 h-screen bg-black shadow-lg fixed top-0 left-0 flex flex-col text-white">
      <div className="p-6 font-bold text-xl border-b border-gray-200">Task Tracker</div>
      <nav className="flex-1 p-4 space-y-4">
        {authNavItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => onStatusChange(item.text)}  // Update status on click
            className={`flex items-center p-3 rounded-lg transition duration-300 ${
              location.pathname === item.to
                ? "text-black bg-[#F7F7F7] font-semibold"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={item.icon} className="mr-3" />
            {item.text}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
