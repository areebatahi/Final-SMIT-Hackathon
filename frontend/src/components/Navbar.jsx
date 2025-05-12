import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faSignOutAlt,
  faUserPlus,
  faSignInAlt,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ onStatusChange }) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const authNavItems = isAuthenticated
    ? [
        { to: "/taskManagement", icon: faTasks, text: "Task Management" },
        { to: "/logout", icon: faSignOutAlt, text: "Logout" },
      ]
    : [
        { to: "/signup", icon: faUserPlus, text: "Sign Up" },
        { to: "/", icon: faSignInAlt, text: "Login" },
      ];

  return (
    <header className="bg-slate-900 text-slate-200 shadow-md fixed top-0 left-0 w-full z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-wide">
          <span className="text-white">Task</span>
          <span className="text-indigo-400">Tracker</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          {authNavItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => onStatusChange?.(item.text)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium
              ${
                location.pathname === item.to
                  ? "bg-indigo-100 text-slate-900 shadow-lg"
                  : "hover:bg-indigo-600 hover:text-white"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} />
              {item.text}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 px-4 pb-4 space-y-2 animate-slide-down">
          {authNavItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => {
                onStatusChange?.(item.text);
                toggleMenu();
              }}
              className={`block w-full px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium
              ${
                location.pathname === item.to
                  ? "bg-indigo-100 text-slate-900 shadow-lg"
                  : "hover:bg-indigo-600 hover:text-white"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="mr-2" />
              {item.text}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;


