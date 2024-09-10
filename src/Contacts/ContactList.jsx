import React, { useState, useEffect } from "react";
import Search from "./Search";
import Contact from "./Contact";
import { IoPersonAddSharp } from "react-icons/io5";
import { ContactActionTypes } from "../Helpers/ContactActionTypes.js";
import format from "date-fns/format";

const ContactList = ({
  onContactSelect,
  selectedContact,
  handleActionType,
}) => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      console.log("fetching...");
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

    if (!contacts.some((contact) => contact.id === selectedContact?.id)) {
      fetchContacts();
    }
  }, [selectedContact]);

  const handleContactSelect = (contact) => {
    handleActionType(ContactActionTypes.NONE);
    onContactSelect(contact);
  };

  const handleAddNewContact = () => {
    handleActionType(ContactActionTypes.ADD);
    onContactSelect("add");
  };

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = contacts.filter((contact) => {
      const firstNameMatch = contact.firstName
        .toLowerCase()
        .includes(lowerQuery);
      const lastNameMatch = contact.lastName.toLowerCase().includes(lowerQuery);
      const streetNameMatch = contact.streetName
        .toLowerCase()
        .includes(lowerQuery);
      const houseNumberMatch = contact.houseNumber
        .toLowerCase()
        .includes(lowerQuery);
      const apartmentNumberMatch = contact.apartmentNumber
        .toLowerCase()
        .includes(lowerQuery);
      const postalCodeMatch = contact.postalCode
        .toLowerCase()
        .includes(lowerQuery);
      const townMatch = contact.town.toLowerCase().includes(lowerQuery);
      const phoneNumberMatch = contact.phoneNumber
        .toLowerCase()
        .includes(lowerQuery);
      const dateOfBirthMatch = format(
        new Date(contact.dateOfBirth),
        "d MMMM yyyy",
      )
        .toLowerCase()
        .includes(lowerQuery);
      const ageMatch = contact.age.toString().includes(lowerQuery);

      return (
        firstNameMatch ||
        lastNameMatch ||
        streetNameMatch ||
        houseNumberMatch ||
        apartmentNumberMatch ||
        postalCodeMatch ||
        townMatch ||
        phoneNumberMatch ||
        dateOfBirthMatch ||
        ageMatch
      );
    });

    setFilteredContacts(filtered);
  };

  return (
    <div className="flex h-[760px] w-1/3 flex-col border-r-2 border-r-gray-200 px-2">
      <Search onSearch={handleSearch} />
      <div className="scrollbar-hide overflow-y-scroll">
        <div
          className={`ml-1 flex h-[80px] cursor-pointer items-center rounded-lg p-2 transition-all duration-200 ${selectedContact === "add" ? "bg-green-200" : "hover:bg-green-100"} `}
          onClick={() => handleAddNewContact()}
        >
          <IoPersonAddSharp size={40} />
          <div className="flex flex-col justify-center pl-6 text-sm">
            <p className="font-bold">Add new contact</p>
          </div>
        </div>
        {filteredContacts.map((contact) => (
          <Contact
            contactInfo={contact}
            key={contact.id}
            onClick={() => handleContactSelect(contact)}
            isSelected={contact.id === selectedContact?.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
