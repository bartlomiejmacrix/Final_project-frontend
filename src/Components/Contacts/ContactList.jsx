import React, { useState, useEffect } from "react";
import Search from "../Shared/Search.jsx";
import Contact from "./Contact.jsx";
import { ContactActionTypes } from "../Helpers/ContactActionTypes.js";
import format from "date-fns/format";
import AddContact from "./AddContact.jsx";
import Loader from "../Shared/Loader.jsx";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ContactList = ({
  contacts,
  setContacts,
  onContactSelect,
  selectedContact,
  handleActionType,
  isConnectionError,
  setIsConnectionError,
  isFetching,
  setIsFetching,
  handleToast,
  isLookingForDuplicates,
}) => {
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [cookies, setCookie] = useCookies(["lastShownDate"]);
  const [isSortedAsc, setIsSortedAsc] = useState(true);
  const [originalContacts, setOriginalContacts] = useState([]);
  const [currentContacts, setCurrentContacts] = useState([]);
  const navigate = useNavigate();

  // For some reason extracting duplicated code to a method does provide the same result.
  const handleSortBtn = () => {
    var sortedFilteredContacts;
    var sortedContacts;
    var sortedOriginalContacts;
    var sortedCurrentContacts;

    if (!isSortedAsc) {
      sortedFilteredContacts = filteredContacts.sort((a, b) =>
        a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()),
      );

      sortedContacts = contacts.sort((a, b) =>
        a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()),
      );

      sortedOriginalContacts = originalContacts.sort((a, b) =>
        a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()),
      );

      sortedCurrentContacts = currentContacts.sort((a, b) =>
        a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()),
      );
    } else {
      sortedFilteredContacts = filteredContacts.sort((b, a) =>
        a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()),
      );

      sortedContacts = contacts.sort((b, a) =>
        a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()),
      );

      sortedOriginalContacts = originalContacts.sort((b, a) =>
        a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()),
      );

      sortedCurrentContacts = currentContacts.sort((b, a) =>
        a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()),
      );
    }

    setIsSortedAsc((prevIsSortedAsc) => !prevIsSortedAsc);
    setFilteredContacts(sortedFilteredContacts);
    setContacts(sortedContacts);
    setOriginalContacts(sortedOriginalContacts);
    setCurrentContacts(sortedCurrentContacts);
  };

  useEffect(() => {
    if (isLookingForDuplicates) {
      const findDuplicates = (contacts) => {
        const seen = new Map();
        const duplicatesSet = new Set();

        contacts.forEach((contact) => {
          const identifier = [
            contact.firstName,
            contact.lastName,
            contact.streetName,
            contact.houseNumber,
            contact.apartmentNumber,
            contact.postalCode,
            contact.town,
            contact.phoneNumber,
            contact.dateOfBirth,
          ]
            .join("_")
            .toLowerCase();

          if (seen.has(identifier)) {
            duplicatesSet.add(contact);
            duplicatesSet.add(seen.get(identifier));
          } else {
            seen.set(identifier, contact);
          }
        });

        return Array.from(duplicatesSet);
      };

      const duplicateContacts = findDuplicates(originalContacts);
      setCurrentContacts(duplicateContacts);
      setFilteredContacts(duplicateContacts);
    } else {
      setCurrentContacts(originalContacts);
      setFilteredContacts(originalContacts);
    }
  }, [isLookingForDuplicates, originalContacts]);

  const isBirthday = (date1, date2) => {
    return (
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const sendToastWhenBirthday = (fetchedContacts) => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    const lastShownDate = cookies.lastShownDate;

    if (lastShownDate === todayString) {
      return;
    }

    let wasTodayBirthday = false;

    fetchedContacts.forEach((contact) => {
      const contactBirthDate = new Date(contact.dateOfBirth);
      if (isBirthday(today, contactBirthDate)) {
        handleToast(
          `🎉 ${contact.firstName} ${contact.lastName} from ${contact.town} has a birthday today!`,
        );
        wasTodayBirthday = true;
      }
    });
    if (wasTodayBirthday) {
      setCookie("lastShownDate", todayString, {
        path: "/",
        maxAge: 24 * 60 * 60,
      });
    }
  };

  const handleAddNewContact = () => {
    handleActionType(ContactActionTypes.ADD);
    onContactSelect("add");
    navigate("/add/customer");
  };

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
        setOriginalContacts(sortedContacts);
        setCurrentContacts(sortedContacts);

        setIsConnectionError(false);

        sendToastWhenBirthday(sortedContacts);

        if (location.pathname === "/add/customer") {
          handleAddNewContact();
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setIsConnectionError(true);
      } finally {
        setIsFetching(false);
      }
    };

    if (
      !contacts.some((contact) => contact.id === selectedContact?.id) &&
      selectedContact !== "add"
    ) {
      fetchContacts();
    }
  }, [selectedContact]);

  const handleContactSelect = (contact) => {
    handleActionType(ContactActionTypes.NONE);
    onContactSelect(contact);
    navigate("/view/customer/" + contact.id);
  };

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();

    const filtered = currentContacts.filter((contact) => {
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
        isSortedAsc={isSortedAsc}
        handleSortBtn={handleSortBtn}
        isLookingForDuplicates={isLookingForDuplicates}
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
              handleAddNewContact={handleAddNewContact}
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
