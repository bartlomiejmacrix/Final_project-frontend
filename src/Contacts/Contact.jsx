import React from "react";
import { IoIosPerson } from "react-icons/io";

const Contact = ({ contactInfo, onClick, isSelected }) => {
  var contactStyles;
  if (isSelected) {
    contactStyles =
      "w-full cursor-pointer rounded-lg p-2 bg-blue-100 bg-blue-100";
  } else {
    contactStyles =
      "w-full cursor-pointer rounded-lg p-2 transition-all duration-200 hover:bg-blue-100";
  }
  return (
    <div
      className={`my-1 w-full cursor-pointer rounded-lg p-2 ${isSelected ? "bg-blue-300" : "transition-all duration-200 hover:bg-blue-100"}`}
      onClick={onClick}
    >
      <div className="flex h-[70px] items-center">
        {contactInfo.image ? (
          <img
            src={`data:image/jpeg;base64,${contactInfo.image}`}
            alt="Contact image"
            className="h-[60px] w-[60px] rounded-full object-cover"
          />
        ) : (
          <IoIosPerson size={50} />
        )}
        <div className="flex flex-col justify-center pl-4 text-sm">
          <p className="font-bold">
            {contactInfo.firstName} {contactInfo.lastName}
          </p>
          <p className="text-gray-500">
            {contactInfo.phoneNumber} {contactInfo.town}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
