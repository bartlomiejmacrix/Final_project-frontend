import React from "react";
import format from "date-fns/format";
import { BsFillTelephoneFill } from "react-icons/bs";
import { LuMapPin } from "react-icons/lu";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaPersonCane } from "react-icons/fa6";

const SelectedContact = ({ contact }) => {
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
    <div className="h-[760px] w-2/3 p-4">
      <div className="flex flex-col items-center">
        <div>[Placeholder for image]</div>
        <h2 className="text-2xl font-bold">
          {contact.firstName} {contact.lastName}
        </h2>
        <p className="text-gray-500">{contact.town}</p>
      </div>
      <div className="mx-24 mt-20 flex items-center justify-between">
        <div className="h-[210px]">
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
                {contact.streetName} {contact.houseNumber}{" "}
                {contact.apartmentNumber}
              </p>
              <p>{contact.postalCode}</p>
              <p className="text-sm text-gray-500">Address</p>
            </div>
          </div>
        </div>
        <div className="h-[210px]">
          <div className="flex items-center">
            <LiaBirthdayCakeSolid size={50} className="text-blue-500" />
            <div className="ml-4">
              <p className="text-lg">
                {format(new Date(contact.dateOfBirth), "yyyy-MM-dd")}
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
