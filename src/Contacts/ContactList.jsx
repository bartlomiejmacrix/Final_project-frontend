import React, { useState, useEffect } from "react";
import Search from "./Search";
import Contact from "./Contact";

const ContactList = ({ onContactSelect, selectedContact }) => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("https://localhost:7158/api/customer");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const sortedContacts = data.sort((a, b) =>
          a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()),
        );
        setContacts(sortedContacts);
        setFilteredContacts(sortedContacts);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = contacts.filter((contact) =>
      contact.firstName.toLowerCase().includes(lowerQuery),
    );
    const sortedFilteredContacts = filtered.sort((a, b) =>
      a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()),
    );
    setFilteredContacts(sortedFilteredContacts);
  };

  return (
    <div className="flex h-[760px] w-1/3 flex-col border-r-2 border-r-gray-200 px-2">
      <Search onSearch={handleSearch} />
      <div className="scrollbar-hide overflow-y-scroll">
        {filteredContacts.map((contact, index) => (
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
