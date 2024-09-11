import React, { useState, useEffect } from "react";
import Search from "./Search";
import Contact from "./Contact";
import { ContactActionTypes } from "../Helpers/ContactActionTypes.js";
import format from "date-fns/format";
import AddContact from "./AddContact.jsx";
import Loader from "../Shared/Loader.jsx";

const ContactList = ({
  onContactSelect,
  selectedContact,
  handleActionType,
  isConnectionError,
  setIsConnectionError,
  isFetching,
  setIsFetching,
}) => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      setIsFetching(true);
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
        setIsConnectionError(false);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setIsConnectionError(true);
      } finally {
        setIsFetching(false);
      }
    };

    if (
      !contacts.some((contact) => contact.id === selectedContact?.id) &&
      selectedContact != "add"
    ) {
      fetchContacts();
    }
  }, [selectedContact]);

  const handleContactSelect = (contact) => {
    handleActionType(ContactActionTypes.NONE);
    onContactSelect(contact);
  };

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();

    const filtered = contacts.filter((contact) => {
      const fields = [
        contact.firstName,
        contact.lastName,
        contact.streetName,
        contact.houseNumber,
        contact.apartmentNumber,
        contact.postalCode,
        contact.town,
        contact.phoneNumber,
        format(new Date(contact.dateOfBirth), "d MMMM yyyy"),
      ].map((field) => field.toLowerCase());

      return fields.some((field) => field.includes(lowerQuery));
    });

    setFilteredContacts(filtered);
  };

  const isInteractionDisabled = isConnectionError || isFetching;

  return (
    <div
      className={`flex h-[760px] w-1/3 flex-col border-r-2 border-r-gray-200 px-2`}
    >
      <Search
        onSearch={handleSearch}
        isInteractionDisabled={isInteractionDisabled}
      />
      <div className="scrollbar-hide overflow-y-scroll">
        <Loader isFetching={isFetching} />
        {!isFetching && (
          <>
            <AddContact
              selectedContact={selectedContact}
              handleActionType={handleActionType}
              onContactSelect={onContactSelect}
              isInteractionDisabled={isInteractionDisabled}
            />
            {filteredContacts.map((contact) => (
              <Contact
                contactInfo={contact}
                key={contact.id}
                onClick={() => handleContactSelect(contact)}
                isSelected={contact.id === selectedContact?.id}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ContactList;
