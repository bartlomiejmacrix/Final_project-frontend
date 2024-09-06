import React, { useState } from "react";
import ContactList from "./ContactList";
import SelectedContact from "./SelectedContact";

const ContactWrapper = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="h-1000px w-860px flex">
      <ContactList onContactSelect={handleContactSelect} />
      <SelectedContact contact={selectedContact} />
    </div>
  );
};

export default ContactWrapper;
