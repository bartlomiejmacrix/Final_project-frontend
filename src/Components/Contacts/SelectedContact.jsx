import React, { useEffect, useState } from "react";
import ContactForm from "./ContactForm.jsx";
import { ContactActionTypes } from "../Helpers/ContactActionTypes.js";
import { IoIosPerson } from "react-icons/io";
import { PiSmileySadLight } from "react-icons/pi";
import ContactData from "./ContactData.jsx";
import ContactDataTwo from "./ContactDataTwo.jsx";
import Loader from "../Shared/Loader.jsx";
import ThreeDots from "../Shared/ThreeDots.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const SelectedContact = ({
  contacts,
  selectedContact,
  onContactSelect,
  handleActionType,
  actionType,
  isConnectionError,
  isFetching,
  setIsContactFound,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isFetchingSuccess = !isConnectionError && !isFetching;

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
        navigate("/");
      } else {
        console.error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error while deleting contact", error);
    }
  };

  useEffect(() => {
    setShowOptions(false);
  }, [selectedContact]);

  const handleUpdate = (contactData) => {
    if (!contactData) {
      contactData = selectedContact;
    }

    if (!contactData.id) {
      contactData.id = selectedContact.id;
    }
    handleActionType(ContactActionTypes.UPDATE);
    navigate("/update/customer/" + contactData.id);
    setShowOptions(false);
  };

  useEffect(() => {
    if (!isFetchingSuccess) return;

    const { pathname } = location;
    const paths = {
      update: "/update/customer/",
      view: "/view/customer/",
    };

    const currentPath = Object.values(paths).find((path) =>
      pathname.startsWith(path),
    );

    if (!currentPath) {
      return;
    }

    const idFromPath = pathname.substring(currentPath.length);
    const contact = contacts.find((contact) => contact.id === idFromPath);

    if (!contact) {
      console.error("Contact not found");
      onContactSelect(null);
      setIsContactFound(false);
      navigate("/");

      return;
    }

    onContactSelect(contact);

    if (currentPath === paths.update) {
      handleUpdate(contact);
    }
  }, [isFetchingSuccess]);

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

        <ThreeDots
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          handleActionType={handleActionType}
          setShowModal={setShowModal}
          selectedContact={selectedContact}
          isFetchingSuccess={isFetchingSuccess}
          handleUpdate={handleUpdate}
        />

        <h2 className="mt-2 text-center text-2xl font-bold">
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
