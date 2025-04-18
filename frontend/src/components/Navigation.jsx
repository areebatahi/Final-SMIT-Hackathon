import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faGift,
  faShoppingBag,
  faChevronDown,
  faTimes,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom"; // Import Link for routing
import logo from "../assets/images/logo (4).png";
import { useSelector } from "react-redux";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg text-[#BD1521]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="h-8 w-auto md:h-30" src={logo} alt="logo" />
            </Link>
          </div>

          <div className="hidden sm:flex space-x-6 ">
            <NavLink to="/" icon={faHome} text="Home" />
            {isAuthenticated && <NavLink to="/profile" text="Profile" />}
            <NavLink to="/about" text="About" />
            <NavLink to="/contact" text="Contact" />

            {isAuthenticated ? (
              <NavLink to="/logout" text="Logout" />
            ) : (
              <>
                <NavLink to="/signup" text="Sign Up" />
                <NavLink to="/login" text="Login" />
              </>
            )}
          </div>

          <div className="flex gap-6">
            <div className="flex items-center">
              <Link to="/cart" className="relative flex items-center">
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  className="h-6 w-6 sm:h-8 sm:w-8 hover:text-[#4bf6d4] transition duration-300"
                />
              </Link>
            </div>

            <div className="sm:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-[#BD1521] focus:outline-none"
              >
                {isOpen ? (
                  <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
                ) : (
                  <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } sm:hidden bg-white shadow-md`}
      >
        <div className="px-4 pt-2 pb-3 space-y-2">
          <NavLinkMobile to="/" text="Home" onClick={toggleMenu} />
          {isAuthenticated && <NavLinkMobile to="/profile" text="Profile" onClick={toggleMenu} />}
          <NavLinkMobile to="/about" text="About" onClick={toggleMenu} />
          <NavLinkMobile to="/contact" text="Contact" onClick={toggleMenu} />
          <NavLinkMobile to="/signup" text="Sign Up" />
          <NavLinkMobile to="/login" text="Login" />
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center text-gray-700 hover:text-[#4bf6d4] transition duration-300 relative group"
  >
    {icon && (
      <span className="mr-2">
        <FontAwesomeIcon icon={icon} />
      </span>
    )}
    <span>{text}</span>
    <span className="absolute bottom-0 left-0 w-full bg-[#4bf6d4] h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
  </Link>
);

const NavLinkMobile = ({ to, text, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block py-2 px-3 text-gray-700 hover:text-[#BD1521] transition duration-300 relative group"
  >
    <span>{text}</span>
    <span className="absolute bottom-0 left-0 w-full  h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
  </Link>
);

export default Navigation;
