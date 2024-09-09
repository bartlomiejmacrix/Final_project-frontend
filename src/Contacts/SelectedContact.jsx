import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import { BsFillTelephoneFill, BsThreeDotsVertical } from "react-icons/bs";
import { LuMapPin } from "react-icons/lu";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaPersonCane } from "react-icons/fa6";
import { FaPenAlt } from "react-icons/fa";
import { RiDeleteBin4Fill } from "react-icons/ri";
import ContactForm from "../ContactForm/ContactForm";
import { ContactActionTypes } from "../Helpers/ContactActionTypes.js";

const SelectedContact = ({
  selectedContact,
  onContactSelect,
  handleActionType,
  actionType,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowOptions(false);
  }, [selectedContact]);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://localhost:7158/api/customer/${selectedContact.id}`,
        {
          method: "DELETE",
        },
      );
      if (response.ok) {
        console.log("Contact deleted successfully");
        setShowModal(false);
        onContactSelect(null);
      } else {
        console.error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error while deleting contact", error);
    }
  };

  if (actionType === ContactActionTypes.ADD) {
    return (
      <div className="h-[760px] w-2/3">
        <ContactForm
          onContactSelect={onContactSelect}
          handleActionType={handleActionType}
        />
      </div>
    );
  }

  if (actionType === ContactActionTypes.UPDATE) {
    return (
      <div className="h-[760px] w-2/3">
        <ContactForm
          onContactSelect={onContactSelect}
          contact={selectedContact}
          handleActionType={handleActionType}
        />
      </div>
    );
  }

  if (!selectedContact) {
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
          onClick={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}
        >
          <BsThreeDotsVertical size={25} />
          {showOptions && (
            <div
              className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-300 bg-white p-2 shadow-md"
              onClick={() => setShowOptions(true)}
              onMouseLeave={() => setShowOptions(false)}
            >
              <ul className="text-black">
                <li
                  className="flex cursor-pointer items-center rounded-lg p-2 transition-all duration-200 hover:bg-blue-500 hover:text-white"
                  onClick={() => handleActionType(ContactActionTypes.UPDATE)}
                >
                  <FaPenAlt />
                  <p className="ml-2">Update contact</p>
                </li>
                <li
                  className="flex cursor-pointer items-center rounded-lg p-2 text-red-500 transition-all duration-200 hover:bg-red-500 hover:text-white"
                  onClick={() => setShowModal(true)}
                >
                  <RiDeleteBin4Fill />
                  <p className="ml-2">Delete contact</p>
                </li>
              </ul>
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold">
          {selectedContact.firstName} {selectedContact.lastName}
        </h2>
        <p className="text-gray-500">{selectedContact.town}</p>
      </div>

      <div className="mx-24 mt-20 flex items-center">
        <div className="h-[300px] w-[200px]">
          <div className="flex items-center">
            <BsFillTelephoneFill size={30} className="text-blue-500" />
            <div className="ml-4">
              <p>{selectedContact.phoneNumber}</p>
              <p className="text-sm text-gray-500">Phone number</p>
            </div>
          </div>
          <div className="mt-24 flex items-center">
            <LuMapPin size={40} className="text-blue-500" />
            <div className="ml-4">
              <p>
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
        <div className="ml-48 h-[300px] w-[220px]">
          <div className="flex items-center">
            <LiaBirthdayCakeSolid size={50} className="text-blue-500" />
            <div className="ml-4">
              <p className="text-lg">
                {format(new Date(selectedContact.dateOfBirth), "d MMMM yyyy")}
              </p>
              <p className="ml-1 text-sm text-gray-500">Date of birth</p>
            </div>
          </div>
          <div className="mt-24 flex">
            <FaPersonCane size={40} className="text-blue-500" />
            <div className="ml-4">
              <p>{selectedContact.age}</p>
              <p className="text-sm text-gray-500">Age</p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Are you sure you want to delete this contact?
            </h2>
            <div className="flex justify-end">
              <button
                className="mr-4 rounded-lg border border-white bg-gray-300 px-4 py-2 transition-all duration-200 hover:border-black"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-lg border border-white bg-red-500 px-4 py-2 text-white transition-all duration-200 hover:border-black"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedContact;
