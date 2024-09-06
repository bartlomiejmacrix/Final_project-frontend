import React from "react";
import { IoIosPerson } from "react-icons/io";

const Contact = () => {
  return (
    <div className="w-full p-2">
      <div className="flex h-[70px] items-center">
        <IoIosPerson size={50} className="ring-blue-500-2" />
        <div className="flex flex-col justify-center pl-4 text-sm">
          <p className="font-bold">FistName + LastName</p>
          <p className="text-gray-500">Phone number + Town</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
