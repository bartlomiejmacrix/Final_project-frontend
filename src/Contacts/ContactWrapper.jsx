import React, { useState } from "react";
import ContactList from "./ContactList";
import SelectedContact from "./SelectedContact";
import { ContactActionTypes } from "../Helpers/ContactActionTypes";

const ContactWrapper = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [actionType, setActionType] = useState(ContactActionTypes.NONE);

  const handleActionType = (action) => {
    setActionType(action);
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="h-1000px w-860px flex">
      <ContactList
        selectedContact={selectedContact}
        onContactSelect={handleContactSelect}
        handleActionType={handleActionType}
      />
      <SelectedContact
        selectedContact={selectedContact}
        onContactSelect={handleContactSelect}
        handleActionType={handleActionType}
        actionType={actionType}
      />
    </div>
  );
};

export default ContactWrapper;
