import React, { useState } from "react";
import format from "date-fns/format";
import { BsFillTelephoneFill, BsThreeDotsVertical } from "react-icons/bs";
import { LuMapPin } from "react-icons/lu";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaPersonCane } from "react-icons/fa6";
import { FaPenAlt } from "react-icons/fa";
import { RiDeleteBin4Fill } from "react-icons/ri";

const SelectedContact = ({ contact }) => {
  const [showOptions, setShowOptions] = useState(false);

  if (!contact) {
    return (
      <div className="h-[760px] w-2/3">
        <p className="mt-16 text-center text-2xl">
          Select a contact to see details
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-[760px] w-2/3 p-4">
      <div className="flex flex-col items-center">
        <div>[Placeholder for image]</div>

        <div
          className="absolute right-6 top-4 cursor-pointer rounded-lg p-2 text-blue-500 transition-all duration-200 hover:bg-blue-500 hover:text-white"
          onMouseEnter={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}
        >
          <BsThreeDotsVertical size={25} />
          {showOptions && (
            <div
              className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-300 bg-white p-2 shadow-md"
              onMouseEnter={() => setShowOptions(true)}
              onMouseLeave={() => setShowOptions(false)}
            >
              <ul className="text-black">
                <li className="flex cursor-pointer items-center rounded-lg p-2 transition-all duration-200 hover:bg-blue-500 hover:text-white">
                  <FaPenAlt />
                  <p className="ml-2">Update contact</p>
                </li>
                <li className="flex cursor-pointer items-center rounded-lg p-2 text-red-500 transition-all duration-200 hover:bg-red-500 hover:text-white">
                  <RiDeleteBin4Fill className="" />
                  <p className="ml-2">Delete contact</p>
                </li>
              </ul>
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold">
          {contact.firstName} {contact.lastName}
        </h2>
        <p className="text-gray-500">{contact.town}</p>
      </div>

      <div className="mx-24 mt-20 flex items-center">
        <div className="h-[210px] w-[180px]">
          <div className="flex items-center">
            <BsFillTelephoneFill size={30} className="text-blue-500" />
            <div className="ml-4">
              <p>{contact.phoneNumber}</p>
              <p className="text-sm text-gray-500">Phone number</p>
            </div>
          </div>
          <div className="mt-24 flex items-center">
            <LuMapPin size={40} className="text-blue-500" />
            <div className="ml-4">
              <p>
                {contact.streetName} {contact.houseNumber}
                {"/"}
                {contact.apartmentNumber}
              </p>
              <p>{contact.postalCode}</p>
              <p className="text-sm text-gray-500">Address</p>
            </div>
          </div>
        </div>
        <div className="ml-60 h-[210px]">
          <div className="flex items-center">
            <LiaBirthdayCakeSolid size={50} className="text-blue-500" />
            <div className="ml-4">
              <p className="text-lg">
                {format(new Date(contact.dateOfBirth), "d MMMM yyyy")}
              </p>
              <p className="ml-1 text-sm text-gray-500">Date of birth</p>
            </div>
          </div>
          <div className="mt-24 flex">
            <FaPersonCane size={40} className="text-blue-500" />
            <div className="ml-4">
              <p>{contact.age}</p>
              <p className="text-sm text-gray-500">Age</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedContact;
