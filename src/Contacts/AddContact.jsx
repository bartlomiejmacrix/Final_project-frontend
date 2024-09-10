import React from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { ContactActionTypes } from "../Helpers/ContactActionTypes";

const AddContact = ({ selectedContact, handleActionType, onContactSelect }) => {
  const handleAddNewContact = () => {
    handleActionType(ContactActionTypes.ADD);
    onContactSelect("add");
  };
  return (
    <div
      className={`ml-1 flex h-[80px] cursor-pointer items-center rounded-lg p-2 transition-all duration-200 ${selectedContact === "add" ? "bg-green-200" : "hover:bg-green-100"} `}
      onClick={() => handleAddNewContact()}
    >
      <IoPersonAddSharp size={40} />
      <div className="flex flex-col justify-center pl-6 text-sm">
        <p className="font-bold">Add new contact</p>
      </div>
    </div>
  );
};

export default AddContact;
