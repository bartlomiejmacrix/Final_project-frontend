import React, { useState, useEffect } from "react";
import Search from "./Search";
import Contact from "./Contact";

const ContactList = ({ onContactSelect, selectedContact }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("https://localhost:7158/api/customer");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="flex h-[760px] w-1/3 flex-col border-r-2 border-r-gray-200 px-2">
      <Search />
      <div className="scrollbar-hide overflow-y-scroll">
        {contacts.map((contact, index) => (
          <Contact
            contactInfo={contact}
            key={index}
            onClick={() => onContactSelect(contact)}
            isSelected={contact === selectedContact}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
