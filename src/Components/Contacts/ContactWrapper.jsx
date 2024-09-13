import React, { useState } from "react";
import ContactList from "./ContactList";
import SelectedContact from "./SelectedContact";
import { ContactActionTypes } from "../Helpers/ContactActionTypes";
import NoContactModal from "../Shared/NoContactModal";

const ContactWrapper = ({ handleToast, isLookingForDuplicates }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [actionType, setActionType] = useState(ContactActionTypes.NONE);
  const [isConnectionError, setIsConnectionError] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [isContactFound, setIsContactFound] = useState(true);

  const handleActionType = (action) => {
    setActionType(action);
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="flex rounded-b-2xl bg-white">
      <ContactList
        contacts={contacts}
        setContacts={setContacts}
        selectedContact={selectedContact}
        onContactSelect={handleContactSelect}
        handleActionType={handleActionType}
        isConnectionError={isConnectionError}
        setIsConnectionError={setIsConnectionError}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
        handleToast={handleToast}
        isLookingForDuplicates={isLookingForDuplicates}
      />
      <SelectedContact
        selectedContact={selectedContact}
        onContactSelect={handleContactSelect}
        handleActionType={handleActionType}
        actionType={actionType}
        isConnectionError={isConnectionError}
        isFetching={isFetching}
        contacts={contacts}
        setIsContactFound={setIsContactFound}
      />
      {!isContactFound && (
        <NoContactModal setIsContactFound={setIsContactFound} />
      )}
    </div>
  );
};

export default ContactWrapper;
