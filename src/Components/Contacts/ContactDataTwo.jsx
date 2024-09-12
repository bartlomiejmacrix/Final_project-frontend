import React from "react";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaPersonCane } from "react-icons/fa6";
import format from "date-fns/format";

const ContactDataTwo = ({ selectedContact }) => {
  return (
    <div>
      <div className="h-[300px] w-[260px] cursor-default">
        <div className="flex h-32 items-center justify-center rounded-2xl border border-blue-500 p-4">
          <LiaBirthdayCakeSolid size={50} className="text-blue-500" />
          <div className="ml-4">
            <p>
              {format(new Date(selectedContact.dateOfBirth), "d MMMM yyyy")}
            </p>
            <p className="ml-1 text-sm text-gray-500">Date of birth</p>
          </div>
        </div>
        <div className="mt-24 flex h-32 items-center justify-center rounded-2xl border border-blue-500 p-4">
          <FaPersonCane size={40} className="text-blue-500" />
          <div className="ml-4">
            <p>{selectedContact.age} years old</p>
            <p className="text-sm text-gray-500">Age</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDataTwo;
