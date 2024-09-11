import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPenAlt } from "react-icons/fa";
import { RiDeleteBin4Fill } from "react-icons/ri";
import ContactForm from "./ContactForm.jsx";
import { ContactActionTypes } from "../Helpers/ContactActionTypes.js";
import { IoIosPerson } from "react-icons/io";
import { PiSmileySadLight } from "react-icons/pi";
import ContactData from "./ContactData.jsx";
import ContactDataTwo from "./ContactDataTwo.jsx";
import Loader from "../Shared/Loader.jsx";

const SelectedContact = ({
  selectedContact,
  onContactSelect,
  handleActionType,
  actionType,
  isConnectionError,
  isFetching,
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
        <div className="mt-16 text-center text-2xl">
          {isConnectionError && (
            <div className="flex flex-col items-center">
              Connection error <PiSmileySadLight size={50} />
            </div>
          )}

          {isFetching && <Loader isFetching={isFetching} />}
          {!isConnectionError &&
            !isFetching &&
            "Select a contact to see details"}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[760px] w-2/3 p-4">
      <div className="flex flex-col items-center">
        <div>
          {selectedContact && selectedContact.image ? (
            <img
              src={`data:image/jpeg;base64,${selectedContact.image}`}
              alt="Contact image"
              className="h-[120px] w-[120px] rounded-full object-cover ring-2 ring-blue-500"
            />
          ) : (
            <IoIosPerson className="h-[120px] w-[120px] rounded-full p-1 ring-2 ring-blue-500" />
          )}
        </div>

        <div
          className="absolute right-4 top-4 cursor-pointer rounded-lg p-2 text-blue-500 transition-all duration-200 hover:bg-blue-500 hover:text-white"
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

        <h2 className="mt-2 text-2xl font-bold">
          {selectedContact.firstName} {selectedContact.lastName}
        </h2>
        <p className="text-gray-500">{selectedContact.town}</p>
      </div>

      <div className="mx-24 mt-20 flex items-center justify-between">
        <ContactData selectedContact={selectedContact} />
        <ContactDataTwo selectedContact={selectedContact} />
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
