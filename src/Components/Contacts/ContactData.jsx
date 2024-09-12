import React from "react";
import { LuMapPin } from "react-icons/lu";
import { BsFillTelephoneFill } from "react-icons/bs";

const ContactData = ({ selectedContact }) => {
  return (
    <div className="h-[300px] w-[260px] cursor-default">
      <div className="flex h-32 w-full items-center justify-center rounded-2xl border border-blue-500 p-4">
        <BsFillTelephoneFill size={30} className="text-blue-500" />
        <div className="ml-4">
          <p>{selectedContact.phoneNumber}</p>
          <p className="text-sm text-gray-500">Phone number</p>
        </div>
      </div>
      <div className="mt-24 flex h-32 items-center justify-center rounded-2xl border border-blue-500 p-4">
        <LuMapPin size={40} className="text-blue-500" />
        <div className="ml-4">
          <p className="w-32 truncate">
            {selectedContact.streetName} {selectedContact.houseNumber}
            {selectedContact.apartmentNumber
              ? "/" + selectedContact.apartmentNumber
              : ""}
          </p>
          <p>{selectedContact.postalCode}</p>
          <p className="text-sm text-gray-500">Address</p>
        </div>
      </div>
    </div>
  );
};

export default ContactData;
