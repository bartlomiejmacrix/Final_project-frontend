import React from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";

const Navbar = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex h-16 items-center justify-between border-b-2 border-b-gray-200 px-4">
      <div className="flex w-28 items-center justify-between">
        <IoPersonCircleSharp size={35} className="text-blue-500" />
        <p className="cursor-default font-semibold">Contacts</p>
      </div>
      <FiRefreshCcw
        size={40}
        className="cursor-pointer rounded-2xl p-1 text-blue-500 transition-all duration-300 hover:bg-blue-400 hover:text-white"
        onClick={handleRefresh}
      />
    </div>
  );
};

export default Navbar;
