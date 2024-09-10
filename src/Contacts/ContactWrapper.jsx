import React, { useState } from "react";
import ContactList from "./ContactList";
import SelectedContact from "./SelectedContact";
import { ContactActionTypes } from "../Helpers/ContactActionTypes";

const ContactWrapper = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [actionType, setActionType] = useState(ContactActionTypes.NONE);
  const [isConnectionError, setIsConnectionError] = useState(false);

  const handleActionType = (action) => {
    setActionType(action);
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="flex">
      <ContactList
        selectedContact={selectedContact}
        onContactSelect={handleContactSelect}
        handleActionType={handleActionType}
        setIsConnectionError={setIsConnectionError}
      />
      <SelectedContact
        selectedContact={selectedContact}
        onContactSelect={handleContactSelect}
        handleActionType={handleActionType}
        actionType={actionType}
        isConnectionError={isConnectionError}
      />
    </div>
  );
};

export default ContactWrapper;
