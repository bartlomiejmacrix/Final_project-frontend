import React, { useState } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const Navbar = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  const toggleMode = () => {
    setIsLightMode((prevMode) => !prevMode);
  };

  const renderIcon = () => {
    if (isLightMode) {
      return (
        <MdOutlineLightMode
          size={40}
          className="cursor-pointer rounded-2xl p-1 text-blue-500 transition-all duration-300 hover:bg-blue-400 hover:text-white"
          onClick={toggleMode}
        />
      );
    }
    return (
      <MdOutlineDarkMode
        size={40}
        className="cursor-pointer rounded-2xl p-1 text-blue-500 transition-all duration-300 hover:bg-blue-400 hover:text-white"
        onClick={toggleMode}
      />
    );
  };

  return (
    <div className="flex h-16 w-full items-center justify-between border-b-2 border-b-gray-200 px-4">
      <div className="flex w-28 items-center justify-between">
        <IoPersonCircleSharp size={35} className="text-blue-500" />
        <p className="cursor-default font-semibold">Contacts</p>
      </div>
      {renderIcon()}
    </div>
  );
};

export default Navbar;
