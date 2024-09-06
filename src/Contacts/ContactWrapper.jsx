import React from "react";
import ContactList from "./ContactList";
import SelectedContact from "./SelectedContact";

const ContactWrapper = () => {
  return (
    <div className="h-1000px w-860px flex">
      <ContactList />
      <SelectedContact />
    </div>
  );
};

export default ContactWrapper;
